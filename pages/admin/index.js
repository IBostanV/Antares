import {hasCookie} from 'cookies-next';

export {default} from './component';

export const getServerSideProps = async ({req, res}) => {
    // const options = {
    //     method: GET,
    //     withHeaders: false,
    //     withCredentials: true,
    //     baseURL: process.env.NEXT_PUBLIC_BE_HOST_URL,
    //     headers: {
    //       Authorization: `Bearer ${getCookie('authorization', {req, res})}`
    //     }
    // };
    // const categoriesRes = await axios.get(`${CATEGORY_PATH}/get-all-categories`, options);

    return {
        props: {
            // categories: categoriesRes.data,
            hostUrl: process.env.NEXT_PUBLIC_BE_HOST_URL,
            isLoggedIn: hasCookie('authorization', {req, res}),
        }
    }
};
