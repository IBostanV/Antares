import React from 'react';
import Link from 'next/link';
import {Button, ButtonGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {logout} from '../../api/authentication';

const LinkButtonGroup = ({links}) => {

    function getButton(link) {
        return (
            <Button key={link.href || link.text} variant='outline-primary' onClick={link.onClick}>
                {link.text}
            </Button>
        );
    }

    return (
        <ButtonGroup>
            {links.map((link) => link.href ? (
                <Link key={link.href} href={link.href}>
                    {getButton(link)}
                </Link>
            ) : (getButton(link)))}
        </ButtonGroup>
    );
};

function Navbar({isLoggedIn}) {
    const router = useRouter();

    const signOut = () => logout().then(() => router.push('/'));

    const commonLinks = [
        {href: "/", text: "Home"},
        {href: "/quiz/categorized", text: "Take Quiz"},
        {href: "/quiz/express", text: "Express Quiz"},
        {href: "/chat", text: "Chat"},
        {href: "/admin", text: "Admin"}
    ];

    const authenticatedLinks = [
        {href: "/profile", text: "Profile"},
        {text: "Sign out", onClick: signOut}
    ];

    const unauthenticatedLinks = [
        {href: "/login", text: "Login"},
        {href: "/register", text: "Register"}
    ];

    return (
        <div className="index">
            <LinkButtonGroup links={commonLinks}/>
            {isLoggedIn ? (<LinkButtonGroup links={authenticatedLinks}/>) : (
                <LinkButtonGroup links={unauthenticatedLinks}/>)}
        </div>
    );
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool,
};

LinkButtonGroup.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape),
};

export default Navbar;
