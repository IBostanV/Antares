import {QUESTION_PATH} from '../constant';
import request from '../../utils/request';

const getAnswers = (questionId) => request(`${QUESTION_PATH}/fetch-answers/${questionId}`);

export default getAnswers;
