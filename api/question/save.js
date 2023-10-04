import request, { POST } from '../../utils/request';
import { QUESTION_PATH } from '../constant';

const saveQuestion = (body) => request(QUESTION_PATH, {
  body,
  method: POST,
  withHeaders: true,
});

export default saveQuestion;
