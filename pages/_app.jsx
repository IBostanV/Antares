import React from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";
import {Slide, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Application({Component, pageProps}) {
    const {isLoggedIn} = pageProps;
    return (
        <Layout isLoggedIn={isLoggedIn}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
                <ToastContainer theme="dark"
                                autoClose="2000"
                                draggable={true}
                                transition={Slide}
                                closeOnClick={true}
                                pauseOnHover={true}
                                hideProgressBar={false}/>
            </DevSupport>
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
