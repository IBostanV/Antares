import { QUIZ_PATH } from '../constant';
import request from '../../utils/request';

const getExpressQuiz = () => request(`${QUIZ_PATH}/express`);

export default getExpressQuiz;
