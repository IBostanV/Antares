import {hasCookie} from 'cookies-next';
import {useEffect} from "react";
import {useRouter} from "next/router";
import getUserGroups from "../../api/user/getUserGroups";

export default () => {
    const router = useRouter();

    useEffect(() => {
        const fetchUserGroups = async () => await getUserGroups();
        fetchUserGroups().then(userGroups => {
            router.push(`/chat/${userGroups[0].groupId}`)
                .then(console.log);
        });
    }, []);
}

export const getServerSideProps = async ({req, res}) => ({
    props:
        {
            hostUrl: process.env.NEXT_PUBLIC_BE_HOST_URL,
            isLoggedIn: hasCookie('authorization', {req, res}),
        },
});
