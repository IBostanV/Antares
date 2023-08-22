import React from 'react';
import '../styles/index.scss';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";

function Application({Component, pageProps}) {
    const {isLoggedIn} = pageProps;
    return (
        <Layout isLoggedIn={isLoggedIn}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
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
