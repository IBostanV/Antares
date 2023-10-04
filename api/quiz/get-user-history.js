import { USER_HISTORY_PATH } from '../constant';
import request from '../../utils/request';

const getUserHistoryQuiz = (historyId) => request(`${USER_HISTORY_PATH}/history/${historyId}`);

export default getUserHistoryQuiz;
