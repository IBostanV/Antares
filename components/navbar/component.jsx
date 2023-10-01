import React from 'react';
import Link from 'next/link';
import {Button, ButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {logout} from '../../api/authentication';

function Navbar({isLoggedIn}) {
    const router = useRouter();

    const signOut = () => logout().then(() => router.push('/'));

    return (
        <div className="index">
            <ButtonGroup aria-label="links">
                <Link href="/">
                    <Button variant={'outline-primary'}>Home</Button>
                </Link>
                <Link href="/quiz/categorized">
                    <Button variant={'outline-primary'}>Take Quiz</Button>
                </Link>
                <Link href="/quiz/express">
                    <Button variant={'outline-primary'}>Express Quiz</Button>
                </Link>
                <Link href="/chat">
                    <Button variant={'outline-primary'}>Chat</Button>
                </Link>
                <Link href="/admin">
                    <Button variant={'outline-primary'}>Admin</Button>
                </Link>
            </ButtonGroup>
            {!isLoggedIn && (
                <>
                    <Link href="/login">
                        <Button variant={'outline-primary'}>Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant={'outline-primary'}>Register</Button>
                    </Link>
                </>
            )}
            {isLoggedIn && (
                <Button onClick={signOut} variant={'outline-primary'}>Sign out</Button>
            )}
        </div>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool,
};

export default Navbar;
