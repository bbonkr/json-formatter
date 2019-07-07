const webpack = require('webpack');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
    name: 'json-fomatter-build',
    mode: dev ? 'dev' : 'production',
    devtool: dev ? 'eval' : 'hidden-source-map',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry: {
        app: './jsx/index',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
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
    plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
    },
};
