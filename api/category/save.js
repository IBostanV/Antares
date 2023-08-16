import request, { POST } from '../../utils/request';
import { CATEGORY_PATH } from '../constant';

const saveCategory = (body) => request(CATEGORY_PATH, {
  body,
  method: POST,
  withHeaders: true,
});

export default saveCategory;
