import request, {POST} from "../../utils/request";
import {deleteCookie} from "cookies-next";

export default (url, body) => request(url, {
    body, method: POST, withHeaders: true,
}).then((response) => {
    if (response) {
        deleteCookie('authorization');
        return response;
    }
});
