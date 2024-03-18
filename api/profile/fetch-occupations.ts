import request from "../../utils/request";
import {USER_PATH} from "../constant";

const getOccupations = () => request(`${USER_PATH}/occupations`);

export default getOccupations;
