import request, {POST} from '../../utils/request';
import {GLOSSARY_PATH} from '../constant';

const saveGlossaryType = (body) => request(`${GLOSSARY_PATH}/save-type`, {
    body,
    method: POST,
    withHeaders: true,
});

export default saveGlossaryType;
