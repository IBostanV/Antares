import React from 'react';
import { hasCookie } from 'cookies-next';

function Home() {
  return (
    <div>Home Page</div>
  );
}

export const getServerSideProps = async ({ req, res }) => ({
  props:
    {
      isLoggedIn: hasCookie('authorization', { req, res }),
    },
});

export default Home;
