import axios from 'axios';
import Qs from 'qs';
import { getCookie, hasCookie } from 'cookies-next';
import { CSRF_TOKEN_URL } from '../api/constant';

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

const axiosRequest = (url, params = {}) => {
  const options = {
    url,
    method: GET,
    headers: {
      ...(hasCookie('authorization') ? { Authorization: `Bearer ${getCookie('authorization')}` } : undefined),
    },
    withHeaders: false,
    ...params,
  };

  let request;

  switch (options.method) {
    case POST:
    case PATCH:
    case PUT:
      request = axiosInstance[options.method](url, params.body, options);
      break;
    default:
      request = axiosInstance(options);
      break;
  }

  return request.then((response) => ((params.withHeaders) ? response : response.data || response))
    .catch(({ response }) => {
      switch (response.status) {
        case 403:
          throw new Error('Unauthorized. Status ' + response.status);
        case 500:
          throw new Error(response.status + ' ' + response.data);
        default:
          throw new Error(response.status + '' + response.data);
      }
    });
};

export default (url, requestOptions = {}) => {
  if ([POST, PATCH, PUT].includes(requestOptions.method)) {
    return axiosRequest(CSRF_TOKEN_URL)
      .then(() => axiosRequest(url, requestOptions));
  }
  return axiosRequest(url, requestOptions);
};
