import request, { POST } from '../../utils/request';
import { CSRF_TOKEN_URL, LOGOUT_URL } from '../constant';

const logout = () => request(CSRF_TOKEN_URL)
  .then(() => request(LOGOUT_URL, {
    method: POST,
    withHeaders: true
  }));

export default logout;
