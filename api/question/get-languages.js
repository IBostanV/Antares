import { LANGUAGE_PATH } from '../constant';
import request from '../../utils/request';

const getLanguages = () => request(`${LANGUAGE_PATH}/languages`);

export default getLanguages;
