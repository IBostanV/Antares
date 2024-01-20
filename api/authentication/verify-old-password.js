import request, { POST } from '../../utils/request';
import { VERIFY_OLD_PASSWORD_URL } from '../constant';

export default (body) => request(VERIFY_OLD_PASSWORD_URL, {
  body,
  method: POST
})
