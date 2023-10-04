import { QUESTION_PATH } from '../constant';
import request from '../../utils/request';

const getQuestionTypes = () => request(`${QUESTION_PATH}/question-types`);

export default getQuestionTypes;
