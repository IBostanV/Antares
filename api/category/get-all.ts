import { CATEGORY_PATH } from '../constant';
import request from '../../utils/request';

const getCategories = () => request(`${CATEGORY_PATH}/all-categories`);

export default getCategories;
