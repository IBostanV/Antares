import { setCookie } from 'cookies-next';
import request, { POST } from '../../utils/request';

const authentication = (url, body) => request(url, {
  body,
  method: POST,
  withHeaders: true
})
  .then((response) => setCookie('authorization', response.headers.authorization));

export default authentication;
