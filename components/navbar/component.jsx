import React from 'react';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function Navbar({ isLoggedIn }) {
  const router = useRouter();

  const logout = () => {
    deleteCookie('authorization');
    router.push('/');
  };

  return (
    <div className="index">
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/sse">
        <Button>SSE</Button>
      </Link>
      {!isLoggedIn && (
        <>
          <br />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <br />
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
      {isLoggedIn && (
        <Button onClick={logout}>Logout</Button>
      )}
    </div>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Navbar;
