import { setCookie } from 'cookies-next';
import request, { POST } from '../../utils/request';
import { CSRF_TOKEN_URL } from './index';

const authentication = (url, body) => request(CSRF_TOKEN_URL)
  .then(() => authenticate(url, body));

const authenticate = (url, body) => request(url, {
  body,
  method: POST,
  withHeaders: true
})
  .then((response) => setCookie('authorization', response.headers.authorization));

export default authentication;
