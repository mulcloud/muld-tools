import { merge } from 'webpack-merge';
import { WebpackConfig } from './types';
import { getSiteDevConfig } from './webpack.dev';
import { getMuldConfig, SITE_DIST_DIR } from './constant';
import { get } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');
const muldConfig = getMuldConfig();
const outputDir = get(muldConfig, 'build.site.outputDir', SITE_DIST_DIR);
const publicPath = get(muldConfig, 'build.site.publicPath', '/');

export function getSitePrdConfig(): WebpackConfig {
    return merge(getSiteDevConfig(), {
        mode: 'production',
        stats: 'none',
        performance: {
            maxAssetSize: 5 * 1024 * 1024,
            maxEntrypointSize: 5 * 1024 * 1024,
        },
        output: {
            publicPath,
            path: outputDir,
            filename: '[name].[hash:8].js',
            chunkFilename: 'async_[name].[chunkhash:8].js',
        },
        optimization: {
            minimize: true,
            concatenateModules: true,
            runtimeChunk: true,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        priority: 2,
                        minChunks: 2,
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    exclude: /\.min\.js$/,
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        compress: {
                            unused: true,
                            warnings: false,
                            drop_debugger: true,
                        },
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    });
}
