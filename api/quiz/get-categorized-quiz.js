import { QUIZ_PATH } from '../constant';
import request from '../../utils/request';

const getCategorizedQuiz = (categoryId) => request(`${QUIZ_PATH}/categorized/${categoryId}`);

export default getCategorizedQuiz;
