import React from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';

function Application({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

Application.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};

export default Application;
