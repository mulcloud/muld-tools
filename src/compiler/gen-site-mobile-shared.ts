import { join, parse } from 'path';
import glob from 'fast-glob';
import { existsSync, readdirSync } from 'fs-extra';
import { SRC_DIR, SITE_MODILE_SHARED_FILE, DOCS_DIR } from '../config/constant';
import {
    pascalize,
    removeExt,
    decamelize,
    getMuldConfig,
    smartOutputFile,
    normalizePath,
} from '../utils';

type DemoItem = {
    name: string;
    path: string;
    component: string;
};

function genInstall() {
    return `import * as React from 'react';
`;
}

function genImports(demos: DemoItem[]) {
    return demos
        .map((item) => `import ${item.name} from '${removeExt(normalizePath(item.path))}';`)
        .join('\n');
}

function genExports(demos: DemoItem[]) {
    return `export const demos = {\n  ${demos.map((item) => item.name).join(',\n  ')}\n};`;
}

function getSetName(demos: DemoItem[]) {
    return demos.map((item) => `${item.name}.name = 'demo-${item.component}';`).join('\n');
}

function genConfig(demos: DemoItem[]) {
    const muldConfig = getMuldConfig();
    const demoNames = demos.map((item) => decamelize(item.name));

    function demoFilter(nav: any[]) {
        return nav.filter((group) => {
            group.items = group.items.filter((item: any) => demoNames.includes(item.path));
            return group.items.length;
        });
    }

    const { nav, locales } = muldConfig.site;
    if (locales) {
        Object.keys(locales).forEach((lang: string) => {
            if (locales[lang].nav) {
                locales[lang].nav = demoFilter(locales[lang].nav);
            }
        });
    } else if (nav) {
        muldConfig.site.nav = demoFilter(nav);
    }

    return `export const config = ${JSON.stringify(muldConfig, null, 2)}`;
}

export function genSiteMobileShared() {
    const dirs = readdirSync(SRC_DIR);
    const demos = dirs
        .map((component) => ({
            component,
            name: pascalize(component),
            // path: join(SRC_DIR, component, 'README.zh-CN.md'),
            path: join(SRC_DIR, component, 'demo/index.tsx'),
        }))
        .filter((item) => existsSync(item.path));

    // const demos = resolveDocuments(dirs);

    const code = `${genInstall()}
${genImports(demos)}

${genExports(demos)}
${genConfig(demos)}
`;

    smartOutputFile(SITE_MODILE_SHARED_FILE, code);
}
