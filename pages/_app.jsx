import React from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import {Slide, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper-bundle.css';

function Application({Component, pageProps}) {
    const {isLoggedIn} = pageProps;
    return (
        <Layout isLoggedIn={isLoggedIn}>
            <Component {...pageProps} />
            <ToastContainer theme="dark"
                            autoClose="2000"
                            draggable={true}
                            transition={Slide}
                            closeOnClick={true}
                            pauseOnHover={true}
                            hideProgressBar={false}/>
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
