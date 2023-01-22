import axios from 'axios';
import Qs from 'qs';
import { getCookie, hasCookie } from 'cookies-next';
import { CSRF_TOKEN_URL } from '../api/authentication';

export const POST = 'post';
export const GET = 'get';
export const DELETE = 'delete';
export const PUT = 'put';
export const PATCH = 'patch';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_HOST_URL,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  },
});

export default (url, requestOptions = {}) => {
  if ([POST, PATCH, PUT].includes(requestOptions.method)) {
    return axiosRequest(CSRF_TOKEN_URL)
      .then(() => axiosRequest(url, requestOptions));
  }
  return axiosRequest(url, requestOptions);
};

const axiosRequest = (url, requestOptions = {}) => {
  const options = {
    url,
    method: GET,
    headers: {
      ...(hasCookie('authorization') ? {'Authorization' : `Bearer ${getCookie('authorization')}`} : undefined)
    },
    withHeaders: false,
    ...requestOptions,
  };

  let request;

  switch (options.method) {
    case POST:
    case PATCH:
    case PUT:
      request = axiosInstance[options.method](url, requestOptions.body, options);
      break;
    default:
      request = axiosInstance(options);
      break;
  }

  return request.then((response) => ((requestOptions.withHeaders) ? response : response.data || response))
    .catch(({ response }) => {
      switch (response.status) {
        case 403:
        case 500:
          console.log(response.data);
          break;
        default:
          console.log(response.data);
          break;
      }
    });
};

