import {QUESTION_PATH} from '../constant';
import request from '../../utils/request';

const getQuestionWithOptions = (questionId) => request(`${QUESTION_PATH}/question-with-options/${questionId}`);

export default getQuestionWithOptions;
