import {QUESTION_PATH} from '../constant';
import request from '../../utils/request';

const getQuestionLanguages = () => request(`${QUESTION_PATH}/question-languages`);

export default getQuestionLanguages;
