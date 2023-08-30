import request, {POST} from "../../utils/request";
import {USER_HISTORY_PATH} from "../constant";

const saveUserQuiz = (body) => request(USER_HISTORY_PATH, {
    body,
    method: POST,
    withHeaders: true,
});

export default saveUserQuiz;
