import { QUESTION_PATH } from '../constant';
import request from '../../utils/request';

const getQuestionAttributes = () => request(`${QUESTION_PATH}/question-attributes`);

export default getQuestionAttributes;
