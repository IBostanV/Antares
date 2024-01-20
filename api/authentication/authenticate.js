import { setCookie } from 'cookies-next';
import request, { POST } from '../../utils/request';

const authentication = (url, body) => request(url, {
  body,
  method: POST,
  withHeaders: true,
})
  .then((response) => {
    if (response) {
      setCookie('authorization', response.headers.authorization);
      return response;
    }
  });

export default authentication;
