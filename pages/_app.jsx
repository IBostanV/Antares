import React, {useEffect} from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import {Slide, ToastContainer} from 'react-toastify';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper-bundle.css';
import {I18nextProvider, useTranslation} from "react-i18next";
import _i18n_ from '../i18n-config';
import {UserProvider} from "../context/user-context";

function Application({ Component, pageProps }) {
  const { isLoggedIn } = pageProps;
  const { i18n } = useTranslation();

    useEffect(() => {
        const userLanguage = localStorage.getItem('langCode');
        if (userLanguage) {
            i18n.changeLanguage(userLanguage).then(() => null);
        }
    }, [isLoggedIn]);

  return (
      <UserProvider>
          <I18nextProvider i18n={_i18n_}>
              <Layout isLoggedIn={isLoggedIn}>
                  <Component {...pageProps} />
                  <ToastContainer theme="dark"
                                  autoClose="2000"
                                  draggable={true}
                                  transition={Slide}
                                  closeOnClick={true}
                                  pauseOnHover={true}
                                  position="bottom-right"
                                  hideProgressBar={false}
                  />
              </Layout>
          </I18nextProvider>
      </UserProvider>
  );
}

Application.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

export default Application;
