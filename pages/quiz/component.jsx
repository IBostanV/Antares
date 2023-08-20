import {useEffect, useState} from "react";
import getExpressQuiz from "../../api/quiz/get-express";
import {Button} from "react-bootstrap";
import getAnswers from "../../api/question/get-answers";

function Quiz() {
    const [quiz, setQuiz] = useState({
        questionList: []
    });
    const [current, setCurrent] = useState({});

    useEffect(() => {
        const fetchExpressQuiz = async () => {
            return await getExpressQuiz();
        }
        fetchExpressQuiz().then(result => {
            setCurrent(result?.questionList?.shift());
            setQuiz(result);
        });
    }, []);

    const handleAnswer = (event) => {
        const answer = `${event.target.textContent}`;
        const fetchAnswers = async () => {
            return await getAnswers(current.id);
        }

        fetchAnswers().then(result => {
            const answers = result?.map(answer => answer.content);

            event.target.className = answers.includes(answer) ? 'btn btn-success' : 'btn btn-danger';

            setTimeout(() => {
                event.target.className = 'btn btn-outline-info';
                if (quiz.questionList.length) {
                    setCurrent(quiz.questionList?.shift());
                }
            }, 1000);
        })
    }

    return (
        <div className={'m-auto mb-3 text-center'}>
            <h1 className={'text-center'}>{current?.content}</h1>
            {current?.answers?.map(answer => (
                <Button
                    variant={'outline-info'}
                    key={answer.content}
                    onClick={handleAnswer}>
                    {answer.content}
                </Button>
            ))}
        </div>
    )
}

export default Quiz;