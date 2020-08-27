import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { decamelize } from '../common';
import { demos, config } from 'site-mobile-shared';
import DemoHome from './layout/DemoHome';
import { getLang, setDefaultLang, setComponents } from '../common/locales';

const { locales, defaultLang } = config.site;
setDefaultLang(defaultLang);

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
    const names = Object.keys(demos);
    const langs = locales ? Object.keys(locales) : [];
    const componentsMap: Record<string, string> = {};

    routes.push({
        path: '/',
        element: <DemoHome />,
    });
    routes.push({
        path: '/zh-CN/home',
        element: <DemoHome />,
    });
    routes.push({
        path: '/zh-CN/changelog',
        element: <DemoHome />,
    });

    names.forEach((name) => {
        const component = decamelize(name);

        const C = demos[name];
        if (langs.length) {
            langs.forEach((lang) => {
                routes.push({
                    name: `${lang}/${component}`,
                    path: `/${lang}/${component}`,
                    element: <C />,
                    meta: {
                        name,
                        lang,
                    },
                });
                componentsMap[`/${lang}/${component}`] = name;
            });
        } else {
            routes.push({
                name,
                path: `/${component}`,
                element: <C />,
                meta: {
                    name,
                },
            });
            componentsMap[`/${component}`] = name;
        }
    });
    routes.push({
        element: <Navigate to="/" />,
    });
    setComponents(componentsMap);
    return routes;
}
