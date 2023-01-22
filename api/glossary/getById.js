import { GLOSSARY_PATH } from './index';
import request from '../../utils/request';

const getGlossaryById = (id) => request(`${GLOSSARY_PATH}/id/${id}`);

export default getGlossaryById;
