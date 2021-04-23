import React from 'react';
import App  from 'next/app';

import '../styles/index.scss';

class Application extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}), appProp: ctx.pathname }
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default Application;
