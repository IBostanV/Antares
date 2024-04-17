import { USER_PATH } from '../constant';
import request from '../../utils/request';

export default (userId: string) => request(`${USER_PATH}/friends/${userId}`);
