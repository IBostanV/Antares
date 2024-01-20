import request, { POST } from '../../utils/request';
import { USER_PATH } from '../constant';

const saveProfileInfo = (body, avatar) => {
  const formData = new FormData();

  formData.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

  if (avatar) {
    formData.append('avatar', avatar, avatar.name);
  }

  return request(USER_PATH, {
    body: formData,
    method: POST,
    withHeaders: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default saveProfileInfo;