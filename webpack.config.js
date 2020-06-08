const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    name: 'json-fomatter-build',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'hidden-source-map' : 'eval',
    resolve: {
        extensions: ['.jsx', '.js', '.ts', '.tsx'],
    },
    entry: {
        app: './src/index',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: !isProduction }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '',
                },
            ],
        }),
        // https://github.com/NekR/offline-plugin
        // it's always better if OfflinePlugin is the last plugin added
        new OfflinePlugin(),
    ],
    output: {
        filename: 'dist/[name].js',
        path: path.join(__dirname, '.build'),
    },
};
