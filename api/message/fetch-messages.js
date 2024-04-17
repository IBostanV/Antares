import request from '../../utils/request';

const fetchMessages = (url, dest) => request(url, { params: { dest } });

export default fetchMessages;
