const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.STAGE === 'production';

module.exports = {
    name: 'build',
    devtool: 'hidden-source-map',
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: {
        app: path.join(__dirname, 'src', 'index'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     plugins: [
                        //         !isProduction && 'react-refresh/babel',
                        //     ].filter(Boolean),
                        // },
                    },
                ].filter(Boolean),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ dev: !isProduction }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: '../index.html',
        }),

        isProduction &&
            new CopyWebpackPlugin({
                patterns: [{ from: 'public', to: '../' }],
            }),
    ].filter(Boolean),
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'publish', 'dist'),
        publicPath: './dist',
        clean: true,
    },
};
