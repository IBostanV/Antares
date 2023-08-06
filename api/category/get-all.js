import { CATEGORY_PATH } from '../constant';
import request from '../../utils/request';

const getCategories = () => request(`${CATEGORY_PATH}/get-all-categories`);

export default getCategories;
