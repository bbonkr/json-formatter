const webpack = require('webpack');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config');

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval',
    resolve: {
        ...baseConfig.resolve,
    },
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['react-refresh/babel'],
                        },
                    },
                ].filter(Boolean),
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshPlugin(),
    ],
    output: {
        ...baseConfig.output,
        clean: false,
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        liveReload: false,
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: path.resolve('publish'),
        },
    },
};
