import request, { POST } from '../../utils/request';
import { CSRF_TOKEN_URL, LOGOUT_URL } from './index';

const logout = () => request(CSRF_TOKEN_URL)
  .then(() => request(LOGOUT_URL, { method: POST }));


export default logout;
