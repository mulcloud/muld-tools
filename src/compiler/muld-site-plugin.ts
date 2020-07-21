import { Compiler } from 'webpack';
import { genSiteMobileShared } from './gen-site-mobile-shared';
import { genSiteDesktopShared } from './gen-site-desktop-shared';
import { genStyleDepsMap } from './gen-style-deps-map';
import { PACKAGE_ENTRY_FILE, PACKAGE_STYLE_FILE } from '../config/constant';

const PLUGIN_NAME = 'MuldSitePlugin';

export async function genSiteEntry() {
    return new Promise((resolve, reject) => {
        genStyleDepsMap()
            .then(() => {
                genSiteMobileShared();
                genSiteDesktopShared();
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

export class MuldSitePlugin {
    apply(compiler: Compiler) {
        if (process.env.NODE_ENV === 'production') {
            compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, genSiteEntry as any);
        } else {
            compiler.hooks.watchRun.tapPromise(PLUGIN_NAME, genSiteEntry as any);
        }
    }
}
