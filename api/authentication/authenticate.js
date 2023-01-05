import { setCookie } from 'cookies-next';
import request, { POST } from '../../utils/request';

const authenticate = (url, body) => request(url, {body, method: POST, withHeaders: true})
  .then((response) => {
    const { authorization } = response.headers;
    setCookie('authorization', authorization);
  });

export default authenticate;
