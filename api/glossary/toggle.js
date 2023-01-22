import request, { PUT } from '../../utils/request';
import { GLOSSARY_PATH } from './index';

const toggleGlossaryById = (id) => request(GLOSSARY_PATH, { method: PUT, params: { id } });

export default toggleGlossaryById;
