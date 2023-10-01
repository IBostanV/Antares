import React, {useEffect, useState} from "react";
import getExpressQuiz from "../../../api/quiz/get-express";
import {Button, Image} from "react-bootstrap";
import saveUserQuiz from "../../../api/quiz/save";
import {useRouter} from 'next/router';
import moment from 'moment';
import getQuestionWithOptions from "../../../api/question/get-with-options";
import {useInterval} from "primereact/hooks";
import {Knob} from 'primereact/knob';

function ExpressQuiz() {
    const router = useRouter();

    const [overallTime, setOverallTime] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [questionIds, setQuestionIds] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
    const [quiz, setQuiz] = useState({quizTime: null, questionIds: []});

    useEffect(() => {
        const fetchExpressQuiz = async () => await getExpressQuiz();

        fetchExpressQuiz().then(expressQuiz => {
            if (expressQuiz) {
                setQuiz(expressQuiz);
                setCurrentQuestionTime(Date.now());
                setQuestionIds(Array.from(expressQuiz.questionIds));

                const time = moment().clone().add(expressQuiz.quizTime + 1, 'seconds');
                setInterval(() => {
                    const remainingTime = moment(time).diff(moment(), 'seconds');
                    if (remainingTime !== 0 && remainingTime > -1) {
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
        const saveResult = async () =>
            await saveUserQuiz({quiz, spentTime, answersJson: JSON.stringify(userAnswers)})

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
        const fetchQuestionWithOptions = async () => await getQuestionWithOptions(questionId)
        fetchQuestionWithOptions().then(question => setCurrentQuestion(question));
    }

    const handleImage = (source) => {
        return `data:image/jpeg;base64,${source}`;
    }

    return (
        <div className="d-flex h-100 flex-column">
            <Knob
                readOnly
                size={100}
                textColor='white'
                valueColor="white"
                rangeColor="#0d6efd"
                value={overallTime}
                className='text-center'
            />
            <div className="d-flex justify-content-center align-items-center h-100 flex-column">
                <h1 className='text-center'>{currentQuestion?.content}</h1>
                <div className='d-flex'>
                    {currentQuestion?.answers?.map(answer => (
                        <div key={answer.content} className='d-flex align-items-center flex-column justify-content-center'>
                            <Image
                                fluid
                                rounded
                                width={200}
                                height={150}
                                src={handleImage(answer?.glossaryAttachment)}
                            />
                            <Button
                                key={answer.content}
                                variant="outline-light"
                                onClick={() => handleAnswer(answer.termId)}
                            >
                                {answer.content}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExpressQuiz;