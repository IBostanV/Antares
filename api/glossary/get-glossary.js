import request from '../../utils/request';

const getGlossary = (url, body) => request(url, { body })
  .then((response) => {
    console.log(response);
  });

export default getGlossary;
