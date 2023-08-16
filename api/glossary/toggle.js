import request, { PUT } from '../../utils/request';
import { GLOSSARY_PATH } from '../constant';

const toggleGlossaryById = (id) => request(GLOSSARY_PATH, { method: PUT, params: { id } });

export default toggleGlossaryById;
