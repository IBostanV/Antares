import axios from 'axios';

const sendEmailRequest = (body) => axios.post(`${process.env.NEXT_PUBLIC_BE_HOST_URL}/email`, body);

export default sendEmailRequest;
