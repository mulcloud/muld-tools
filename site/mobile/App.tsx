import * as React from 'react';
import { getRoutes } from './router';
import { useRoutes, HashRouter as Router, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Base } from '../common/style/base';
import GlobalStyle from 'builtin_css';

function RouterView() {
    let element = useRoutes(getRoutes());
    return element;
}
export function App() {
    return (
        <div>
            <GlobalStyle />
            <Base />
            <OverrideCss />
            <Router>
                <RouterView />
            </Router>
        </div>
    );
}
const OverrideCss = createGlobalStyle`
    body {
        min-width: 100vw;
    }

    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`;
