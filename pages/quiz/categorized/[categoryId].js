import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';
import moment from 'moment/moment';
import { hasCookie } from 'cookies-next';
import { getCategorizedQuiz } from '../../../api/quiz';
import getQuestionWithOptions from '../../../api/question/get-with-options';
import saveUserQuiz from '../../../api/quiz/save';

function Quiz() {
  const router = useRouter();
  const { categoryId } = router.query;

  const [spentTime, setSpentTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [quiz, setQuiz] = useState({ quizTime: null, questionIds: [] });

  useEffect(() => {
    const createQuiz = async () => await getCategorizedQuiz(categoryId);

    createQuiz().then((quiz) => {
      if (quiz) {
        setQuiz(quiz);
        setCurrentQuestionTime(Date.now());
        setQuestionIds(Array.from(quiz.questionIds));

        const startTime = moment();
        setInterval(() => {
          const time = moment(moment()).diff(startTime, 'seconds');
          setSpentTime(time);
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
      saveQuizResult();
    }
  }, [completed]);

  const saveQuizResult = () => {
    const saveResult = async () => await saveUserQuiz({ quiz, spentTime, answersJson: JSON.stringify(userAnswers) });
    saveResult().then((result) => {
      router.push(`/quiz/result?historyId=${result.data.historyId}`)
        .then((pushEvent) => console.log(pushEvent));
    });
  };

  const handleAnswer = (termId) => {
    const now = Date.now();
    setUserAnswers((values) => [...values, {
      [currentQuestion.id]: {
        answer: termId,
        time: now - currentQuestionTime,
      },
    }]);
    setCurrentQuestionTime(now);

    if (questionIds.length) {
      handleCurrentQuestion(questionIds.shift());
    } else {
      setCompleted(true);
    }
  };

  const handleCurrentQuestion = (questionId) => {
    const fetchQuestionWithOptions = async () => await getQuestionWithOptions(questionId);
    fetchQuestionWithOptions().then((question) => setCurrentQuestion(question));
  };

  const handleImage = (source) => `data:image/jpeg;base64,${source}`;

  return (
    <div className="d-flex h-100 flex-column">
      <h1 className="text-center">{spentTime}</h1>
      <div className="d-flex justify-content-center align-items-center h-100 flex-column">
        <h1 className="text-center">{currentQuestion?.content}</h1>
        <div className="d-flex">
          {currentQuestion?.answers?.map((answer) => (
            <div
              key={answer.content}
              className="d-flex align-items-center flex-column justify-content-center"
            >
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
  );
}

export const getServerSideProps = async ({ req, res }) => ({
  props:
        {
          hostUrl: process.env.NEXT_PUBLIC_BE_HOST_URL,
          isLoggedIn: hasCookie('authorization', { req, res }),
        },
});

export default Quiz;
