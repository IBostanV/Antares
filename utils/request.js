import axios from 'axios';
import Qs from 'qs';

export const POST = 'post';
export const GET = 'get';
export const DELETE = 'delete';
export const PUT = 'put';
export const PATCH = 'patch';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_HOST_URL,
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  },
});

export default (url, requestOptions = {}) => {
  const options = {
    url,
    method: GET,
    headers: {},
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

  return request
    .then((response) => response.data || response)
    .catch(({ response }) => {
      const { error } = response.data;

      if (error && error.message) {
        console.log(error.message);
      }

      switch (response.status) {
        case 403:
          console.log(error.message);
          break;
        case 500:
          console.log(error.message);
          break;
        default:
          break;
      }
    });
};
