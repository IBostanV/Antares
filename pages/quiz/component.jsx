import {useEffect, useState} from "react";
import getExpressQuiz from "../../api/quiz/get-express";
import {Button} from "react-bootstrap";
import getAnswers from "../../api/question/get-answers";
import saveUserQuiz from "../../api/quiz/save";
import { useRouter } from 'next/router';

function Quiz() {
    const router = useRouter();

    const [quiz, setQuiz] = useState({
        questionList: []
    });
    const [current, setCurrent] = useState({});
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchExpressQuiz = async () => {
            return await getExpressQuiz();
        }
        fetchExpressQuiz().then(result => {
            setCurrent(result?.questionList?.shift());
            setQuiz(result);
        });
    }, []);

    const handleAnswer = (termId, event) => {
        const fetchAnswers = async () => {
            return await getAnswers(current.id);
        }
        fetchAnswers().then(result => {
            const answers = result?.map(answer => answer.glossary.termId);
            if (answers.includes(termId)) {
                event.target.className = 'btn btn-success';
            } else {
                event.target.className = 'btn btn-danger';
            }
            setUserAnswers(values => [...values, {[current.id]: termId}]);

            setTimeout(() => {
                event.target.className = 'btn btn-outline-info';
                if (quiz.questionList.length) {
                    setCurrent(quiz.questionList?.shift());
                } else {
                    setCompleted(true);
                }
            }, 1000);
        })
    }

    useEffect(() => {
        if (completed) {
            const saveResult = async () => {
                return await saveUserQuiz({quiz, answersJson: JSON.stringify(userAnswers)});
            }
            saveResult().then(result => {
                router.push('/quiz-result?historyId=' + result.data.historyId)
                    .then(pushEvent => console.log(pushEvent));
            })
        }
    }, [completed]);

    return (
        <div className={'m-auto mb-3 text-center'}>
            <h1 className={'text-center'}>{current?.content}</h1>
            {current?.answers?.map(answer => (
                <Button
                    variant={'outline-info'}
                    key={answer.content}
                    onClick={(event) => handleAnswer(answer.glossary.termId, event)}>
                    {answer.content}
                </Button>
            ))}
        </div>
    )
}

export default Quiz;