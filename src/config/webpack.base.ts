import { join } from 'path';
import { WebpackConfig } from './types';
import { CWD, STYLE_EXTS, SCRIPT_EXTS } from './constant';

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const LESS_LOADERS = ['style-loader', 'css-loader', 'less-loader'];
const plugins = [
    new FriendlyErrorsPlugin({
        clearConsole: false,
        logLevel: 'WARNING',
    }),
];
// const tsconfigPath = join(CWD, 'tsconfig.json');

export const baseConfig: WebpackConfig = {
    mode: 'development',
    resolve: {
        extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: LESS_LOADERS,
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
            },
            {
                test: /\.md$/,
                use: [
                    'babel-loader',
                    {
                        loader: require.resolve('../compiler/loader/index'),
                        options: { useRender: false },
                    },
                ],
            },
        ],
    },
    plugins,
};
