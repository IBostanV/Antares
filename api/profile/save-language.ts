import request, {POST} from '../../utils/request';
import {USER_PATH} from '../constant';

const saveUserLanguage = (body) => request(`${USER_PATH}/change-language`, {
    body,
    method: POST,
    withHeaders: true,
});

export default saveUserLanguage;
