import request, { POST } from '../../utils/request';
import { LOGOUT_URL } from './index';

const logout = () => request(LOGOUT_URL, { method: POST });

export default logout;
