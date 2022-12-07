import React from 'react';
import { hasCookie } from 'cookies-next';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

function Home({ isLoggedIn }) {
  return (
    <Layout isLoggedIn={isLoggedIn} />
  );
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  test: PropTypes.string,
};

export const getServerSideProps = async ({ req, res }) => ({
  props:
    {
      isLoggedIn: hasCookie('authorization', { req, res }),
    },
});

export default Home;
