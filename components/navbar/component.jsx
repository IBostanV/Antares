import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { logout } from '../../api/authentication';
import { NavbarItem } from './NavbarItem';

const LinkButtonGroup = ({ links }) => {
  function getButton(link) {
    return (
      <NavbarItem>
        <button key={link.href || link.text} onClick={link.onClick}>
          {link.text}
        </button>
      </NavbarItem>
    );
  }

  return (
    <div className="d-flex">
      {links.map((link) => link.href ? (
        <Link key={link.href} href={link.href}>
          {getButton(link)}
        </Link>
      ) : (getButton(link)))}
    </div>
  );
};

function Navbar({ isLoggedIn }) {
  const router = useRouter();

  const signOut = () => logout()
    .then(() => router.push('/'));

  const commonLinks = [
    {
      href: '/',
      text: 'Home'
    },
    {
      href: '/quiz/categorized',
      text: 'Take quiz'
    },
    {
      href: '/quiz/express',
      text: 'Express quiz'
    },
    {
      href: '/chat',
      text: 'Chat'
    },
    {
      href: '/knowledge-base',
      text: 'Knowledge base'
    },
    {
      href: '/admin',
      text: 'Admin'
    }
  ];

  const authenticatedLinks = [
    {
      href: '/profile',
      text: 'Profile'
    },
    {
      text: 'Sign out',
      onClick: signOut
    }
  ];

  const unauthenticatedLinks = [
    {
      href: '/login',
      text: 'Login'
    },
    {
      href: '/register',
      text: 'Register'
    }
  ];

  return (
    <div className="index">
      <LinkButtonGroup links={commonLinks}/>
      {isLoggedIn
        ? (<LinkButtonGroup links={authenticatedLinks}/>)
        : (<LinkButtonGroup links={unauthenticatedLinks}/>)}
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
