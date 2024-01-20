import request, { POST } from '../../utils/request';
import { CATEGORY_PATH } from '../constant';

const saveCategory = (body, attachment) => {
  const formData = new FormData();

  formData.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

  if (attachment) {
    formData.append('attachment', attachment, attachment.name);
  }

  return request(CATEGORY_PATH, {
    body: formData,
    method: POST,
    withHeaders: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
};

export default saveCategory;
