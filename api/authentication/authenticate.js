import axios from 'axios';
import { setCookie } from 'cookies-next';
import Qs from 'qs';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_HOST_URL,
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  },
});

const authenticate = (url, body) => axiosInstance.post(url, body)
  .then((response) => {
    const { authorization } = response.headers;
    setCookie('authorization', authorization);
  });

export default authenticate;
