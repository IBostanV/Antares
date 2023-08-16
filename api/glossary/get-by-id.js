import { GLOSSARY_PATH } from '../constant';
import request from '../../utils/request';

const getGlossaryById = (id) => request(`${GLOSSARY_PATH}/id/${id}`);

export default getGlossaryById;
