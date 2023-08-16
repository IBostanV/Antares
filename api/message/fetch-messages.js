import request from '../../utils/request';

const fetchMessages = (url, destination) => request(url, { params: { destination } });

export default fetchMessages;
