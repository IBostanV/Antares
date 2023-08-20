import React from 'react';
import Link from 'next/link';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {logout} from '../../api/authentication';

function Navbar({isLoggedIn}) {
    const router = useRouter();

    const signOut = () => {
        logout().then(() => router.push('/'));
    };

    return (
        <div className="index">
            <Link href="/">
                <Button>Home</Button>
            </Link>
            <Link href="/quiz">
                <Button>Take Quiz</Button>
            </Link>
            <Link href="/sse">
                <Button>SSE</Button>
            </Link>
            <Link href="/admin">
                <Button>Admin</Button>
            </Link>
            {!isLoggedIn && (
                <>
                    <br/>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                    <br/>
                    <Link href="/register">
                        <Button>Register</Button>
                    </Link>
                </>
            )}
            {isLoggedIn && (
                <Button onClick={signOut}>Sign out</Button>
            )}
        </div>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool,
};

export default Navbar;
