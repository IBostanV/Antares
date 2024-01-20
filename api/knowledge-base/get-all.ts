import { KNOWLEDGE_BASE_PATH } from '../constant';
import request from '../../utils/request';

const getRepositoryRecords = () => request(`${KNOWLEDGE_BASE_PATH}/all-records`);

export default getRepositoryRecords;
