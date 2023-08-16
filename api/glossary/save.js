import request, {PATCH} from '../../utils/request';
import { GLOSSARY_PATH } from '../constant';

export default (body, attachment) => {
    const formData = new FormData();

    formData.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    if (attachment) {
        formData.append('attachment', attachment, attachment.name);
    }

    return request(`${GLOSSARY_PATH}/save`, {
        body: formData,
        method: PATCH,
        withHeaders: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}
