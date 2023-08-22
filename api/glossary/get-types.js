import { GLOSSARY_PATH } from '../constant';
import request from '../../utils/request';

const getGlossaryTypes = () => request(`${GLOSSARY_PATH}/types`);

export default getGlossaryTypes;
