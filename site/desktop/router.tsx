import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { config, documents } from 'site-desktop-shared';
import { isMobile, decamelize } from '../common';
import { getLang, setDefaultLang } from '../common/locales';

if (isMobile) {
    location.replace('mobile.html' + location.hash);
}

const { locales, defaultLang } = config.site;
setDefaultLang(defaultLang);

function parseName(name) {
    if (name.indexOf('_') !== -1) {
        const pairs = name.split('_');
        const component = pairs.shift();

        return {
            component: `${decamelize(component)}`,
            lang: pairs.join('-'),
        };
    }

    return {
        component: `${decamelize(name)}`,
        lang: '',
    };
}

function getLangFromRoute(route) {
    const lang = route.path.split('/')[1];
    const langs = Object.keys(locales);

    if (langs.indexOf(lang) !== -1) {
        return lang;
    }

    return getLang();
}

export function getRoutes() {
    const routes = [];
    const names = Object.keys(documents);

    // { path: '/', element: <Home /> },
    function addHomeRoute(Home, lang) {
        routes.push({
            name: lang,
            path: `/${lang || ''}`,
            element: <Home />,
            meta: { lang },
        });
    }

    names.forEach((name) => {
        const { component, lang } = parseName(name);

        if (component === 'home') {
            addHomeRoute(documents[name], lang);
        }

        const C = documents[name];
        if (lang) {
            routes.push({
                name: `${lang}/${component}`,
                path: `/${lang}/${component}`,
                element: <C />,
                meta: {
                    lang,
                    name: component,
                },
            });
        } else {
            routes.push({
                name: `${component}`,
                path: `/${component}`,
                element: <C />,
                meta: {
                    name: component,
                },
            });
        }
    });

    routes.push({
        element: <Navigate to="/zh-CN/home" />,
    });

    return routes;
}
