import * as React from 'react';
import { useRoutes, HashRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { getRoutes } from './router';
import { Base } from '../common/style/base';
import DemoNav from './layout/DemoNav';
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
                <DemoNav />
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
