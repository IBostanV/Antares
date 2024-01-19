import React from 'react';
import Head from 'next/head';
import Navbar from '../navbar';
import PropTypes from 'prop-types';

/* eslint-disable-next-line */
function Layout({
  children,
  isLoggedIn
}) {
  return (
    <>
      <Head>
        <title>Play Quiz</title>
      </Head>

      <div className="d-flex flex-column background">
        <Navbar isLoggedIn={isLoggedIn}/>
        <main>{children}</main>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  isLoggedIn: PropTypes.bool
};

export default Layout;
