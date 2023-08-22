import {QUESTION_PATH} from '../constant';
import request from '../../utils/request';

const getQuestions = () => request(`${QUESTION_PATH}/all-questions`);

export default getQuestions;
