import * as React from 'react';
import styled from 'styled-components';
import { Doc } from './layout';
import { config, packageVersion } from 'site-desktop-shared';
import { getRoutes } from './router';
import { useRoutes, HashRouter as Router, Routes } from 'react-router-dom';

function RouterView() {
    let element = useRoutes(getRoutes());

    return element;
}

export function App() {
    const path = window.location.pathname.replace(/\/index(\.html)?/, '/');
    const [simulator, setSimulator] = React.useState(`${path}mobile.html${window.location.hash}`);
    React.useEffect(() => {
        window.onhashchange = () => {
            setSimulator(`${path}mobile.html${window.location.hash}`);
        };
        if (window.location.hash) {
            // TODO:
            // scrollToAnchor(window.location.hash);
        }
    }, []);
    const [locale, setLocale] = React.useState(localStorage.getItem('MULD_LANGUAGE') || 'zh-CN');

    // const simulator = `${path}mobile.html${window.location.hash}`;
    const _config = config.site.locales[locale];
    return (
        <div className="app">
            <Router>
                <Doc lang={locale} config={_config} simulator={simulator}>
                    <RouterView />
                </Doc>
            </Router>
        </div>
    );
}
