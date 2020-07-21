import { join } from 'path';
import { WebpackConfig } from './types';

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MuldMarkDownLoader  = require('../compiler/loader/index');

import { existsSync } from 'fs';
import { consola } from '../utils/logger';
import { CWD, CACHE_DIR, STYLE_EXTS, SCRIPT_EXTS, POSTCSS_CONFIG_FILE } from './constant';


const LESS_LOADERS = [
    'style-loader',
    'css-loader',
    'less-loader',
];

const plugins = [
    new FriendlyErrorsPlugin({
        clearConsole: false,
        logLevel: 'WARNING',
    }),
];
const tsconfigPath = join(CWD, 'tsconfig.json');

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
                       use: ['style-loader', 'css-loader', 'less-loader'],
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
                       use: ['babel-loader', require.resolve('../compiler/loader/index')],
                       // use: ['raw-loader'],
                   },
               ],
           },
           plugins,
       };
