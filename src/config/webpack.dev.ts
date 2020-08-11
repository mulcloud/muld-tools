import WebpackBar from 'webpackbar';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import { merge } from 'webpack-merge';
import { baseConfig } from './webpack.base';
import { WebpackConfig } from './types';
import { MuldSitePlugin } from '../compiler/muld-site-plugin';
import {
    getMuldConfig,
    GREEN,
    SITE_MODILE_SHARED_FILE,
    SITE_DESKTOP_SHARED_FILE,
    BUILTIN_COMPONENT,
} from './constant';

export function getSiteDevConfig(): WebpackConfig {
    const muldConfig = getMuldConfig();

    function getSiteConfig() {
        const siteConfig = muldConfig.site;
        if (siteConfig.locales) {
            return siteConfig.locales[siteConfig.defaultLang || 'en-US'];
        }
        return siteConfig;
    }

    function getTitle(config: { title: string; description?: string }) {
        let { title } = config;

        if (config.description) {
            title += ` - ${config.description}`;
        }

        return title;
    }
    
    const siteConfig = getSiteConfig();
    const title = getTitle(siteConfig);

    return merge(baseConfig as any, {
        entry: {
            'site-desktop': [join(__dirname, '../../site/desktop/index')],
            'site-mobile': [join(__dirname, '../../site/mobile/index')],
        },
        // cache: { type: 'filesystem' },
        devServer: {
            port: 8080,
            quiet: true,
            host: '0.0.0.0',
            stats: 'errors-only',
            publicPath: '/',
            disableHostCheck: true,
        },
        resolve: {
            alias: {
                'site-mobile-shared': SITE_MODILE_SHARED_FILE,
                'site-desktop-shared': SITE_DESKTOP_SHARED_FILE,
                builtin_css: BUILTIN_COMPONENT,
            },
        },
        output: {
            chunkFilename: '[name].js',
            // path: DIST_DIR,
            // publicPath: '/',
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 0,
                        name: 'chunks',
                    },
                },
            },
        },
        plugins: [
            new WebpackBar({
                name: 'Muld Cli',
                color: GREEN,
            }),
            new MuldSitePlugin(),
            new HtmlWebpackPlugin({
                title,
                logo: siteConfig.logo,
                description: siteConfig.description,
                chunks: ['chunks', 'site-desktop'],
                template: join(__dirname, '../../site/desktop/index.html'),
                filename: 'index.html',
            }),
            new HtmlWebpackPlugin({
                title,
                logo: siteConfig.logo,
                description: siteConfig.description,
                chunks: ['chunks', 'site-mobile'],
                template: join(__dirname, '../../site/mobile/index.html'),
                filename: 'mobile.html',
            }),
        ],
    });
}
