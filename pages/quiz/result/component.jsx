import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import getUserHistoryQuiz from "../../../api/quiz/get-user-history";
import {Table} from "react-bootstrap";

function QuizResult() {
    const router = useRouter();

    const {historyId} = router.query;
    const [historyQuiz, setHistoryQuiz] = useState(null);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    }, []);

    useEffect(() => {
        const fetchUserQuiz = async () => await getUserHistoryQuiz(historyId)
        fetchUserQuiz().then(result => {
            setHistoryQuiz(result);
        });
    }, []);

    const millisToSeconds = (millis) => {
        if (millis === 0) {
            return '-';
        }
        return millis / 1000 + ' seconds';
    }

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
                    <th>Time</th>
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
                        {answer.userAnswer === answer.rightAnswer && (<td/>)}
                        <td>{millisToSeconds(answer.time)}</td>
                    </tr>
                ))}
                <tr>
                    <td className={'h4'}>Time spent:</td>
                    <td colSpan={3} className={'h4'}>
                        <span>{`${historyQuiz?.spentTime} seconds`}</span>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default QuizResult;