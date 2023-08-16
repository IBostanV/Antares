import {QUESTION_PATH} from '../constant';
import request from '../../utils/request';

const getQuestions = () => request(`${QUESTION_PATH}/get-questions`);

export default getQuestions;
