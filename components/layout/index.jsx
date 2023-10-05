import React from 'react';
import Head from 'next/head';
import Navbar from '../navbar';

/* eslint-disable-next-line */
function Layout({ children, isLoggedIn }) {
  return (
    <>
      <Head>
        <title>Play Quiz</title>
      </Head>

      <div className="d-flex flex-column background">
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="h-100">{children}</main>
      </div>
    </>
  );
}

export default Layout;
