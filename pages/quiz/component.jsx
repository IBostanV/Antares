import React, {useEffect, useState} from "react";
import getExpressQuiz from "../../api/quiz/get-express";
import {Button, Image} from "react-bootstrap";
import saveUserQuiz from "../../api/quiz/save";
import {useRouter} from 'next/router';
import moment from 'moment';
import getQuestionWithOptions from "../../api/question/get-with-options";

function Quiz() {
    const router = useRouter();

    const [quiz, setQuiz] = useState({
        quizTime: null,
        questionIds: []
    });
    const [overallTime, setOverallTime] = useState();
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [questionIds, setQuestionIds] = useState([]);

    useEffect(() => {
        const fetchExpressQuiz = async () => {
            return await getExpressQuiz();
        }
        fetchExpressQuiz().then(expressQuiz => {
            if (expressQuiz) {
                setQuiz(expressQuiz);
                setCurrentQuestionTime(Date.now());
                setQuestionIds(Array.from(expressQuiz.questionIds));

                const time = moment().clone().add(expressQuiz.quizTime + 1, 'seconds');
                setInterval(() => {
                    const remainingTime = moment(time).diff(moment(), 'seconds');
                    if (remainingTime !== 0) {
                        setOverallTime(remainingTime);
                    } else {
                        setCompleted(true);
                    }
                }, 100);
            }
        });
    }, []);

    useEffect(() => {
        if (questionIds.length) {
            handleCurrentQuestion(questionIds.shift());
        }
    }, [questionIds]);

    useEffect(() => {
        if (completed) {
            saveQuizResult(quiz.quizTime - overallTime);
        }
    }, [completed]);

    const saveQuizResult = (spentTime) => {
        const saveResult = async () => {
            return await saveUserQuiz({quiz, spentTime, answersJson: JSON.stringify(userAnswers)});
        }
        saveResult().then(result => {
            router.push('/quiz/result?historyId=' + result.data.historyId)
                .then(pushEvent => console.log(pushEvent));
        })
    }

    const handleAnswer = (termId) => {
        const now = Date.now();
        setUserAnswers(values => [...values, {[currentQuestion.id]: {answer: termId, time: now - currentQuestionTime}}])
        setCurrentQuestionTime(now);

        if (questionIds.length) {
            handleCurrentQuestion(questionIds.shift());
        } else {
            setCompleted(true);
        }
    }

    const handleCurrentQuestion = (questionId) => {
        const fetchQuestionWithOptions = async () => {
            return await getQuestionWithOptions(questionId);
        }
        fetchQuestionWithOptions().then(question => setCurrentQuestion(question));
    }

    const handleImage = (source) => {
        return `data:image/jpeg;base64,${source}`;
    }

    return (
        <div className="d-flex h-100 flex-column">
            <h1 className="text-center">{overallTime?.valueOf()}</h1>
            <div className="w-100 h-100 d-flex justify-content-center flex-column">
                <div className="wrapper">
                    <div className="outer flex-column align-content-between">
                        <div className="box">
                            <div className="content">
                                <h1 className={'text-center'}>{currentQuestion?.content}</h1>
                                <div className="details">
                                    {currentQuestion?.answers?.map(answer => (
                                        <div key={answer.content}>
                                            <Image rounded src={handleImage(answer?.glossary.attachment)} fluid width={100} height={150}/>
                                            <Button
                                                variant="outline-light"
                                                key={answer.content}
                                                onClick={() => handleAnswer(answer.glossary.termId)}>
                                                {answer.content}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz;