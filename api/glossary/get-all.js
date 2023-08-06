import { GLOSSARY_PATH } from '../constant';
import request from '../../utils/request';

const getByCategoryGlossaries = (catId) => request(`${GLOSSARY_PATH}/category/${catId}`);

export default getByCategoryGlossaries;
