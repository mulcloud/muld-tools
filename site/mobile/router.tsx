import * as React from 'react';
import * as router from 'react-router-dom';
import DemoHome from './layout/DemoHome';
import { decamelize } from '../common';
import { demos, config } from 'site-mobile-shared';
import { getLang, setDefaultLang } from '../common/locales';

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

    // if (langs.length) {
    //     routes.push({
    //         path: '*',
    //         redirect: (route) => `/${getLangFromRoute(route)}/`,
    //     });

    //     langs.forEach((lang) => {
    //         routes.push({
    //             path: `/${lang}`,
    //             component: DemoHome,
    //             meta: { lang },
    //         });
    //     });
    // } else {
    //     routes.push({
    //         path: '*',
    //         redirect: () => '/',
    //     });

    //     routes.push({
    //         path: '/',
    //         component: DemoHome,
    //     });
    // }

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
        }
    });

    return routes;
}