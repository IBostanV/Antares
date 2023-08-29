import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import getUserHistoryQuiz from "../../api/quiz/get-user-quiz";
import {Table} from "react-bootstrap";

function QuizResult() {
    const router = useRouter();

    const {historyId} = router.query;
    const [historyQuiz, setHistoryQuiz] = useState({});

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    }, []);

    useEffect(() => {
        const fetchUserQuiz = async () => {
            return await getUserHistoryQuiz(historyId);
        }

        fetchUserQuiz().then(result => {
            setHistoryQuiz(result);
        });
    }, []);

    return (
        <div className={'m-auto mb-3 text-center'}>
            <h2>Quiz result</h2>
            <hr/>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Right answer</th>
                </tr>
                </thead>
                <tbody>
                {historyQuiz?.answers?.map((answer, index) => (
                    <tr key={index}>
                        <td>{answer.content}</td>
                        <td>{answer.userAnswer}</td>
                        {answer.userAnswer !== answer.rightAnswer && (
                            <td>{answer.rightAnswer}</td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default QuizResult;