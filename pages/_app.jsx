import React from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

function Application({ Component, pageProps }) {
  const { isLoggedIn } = pageProps;
  return (
    <Layout isLoggedIn={isLoggedIn}>
      <Component {...pageProps} />
    </Layout>
  );
}

Application.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

export default Application;
