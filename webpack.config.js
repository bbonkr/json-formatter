const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  name: "json-fomatter-build",
  mode: isProduction ? "production" : "dev",
  devtool: isProduction ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  entry: {
    app: "./src/jsx/index",
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: !isProduction }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "",
        },
      ],
    }),
  ],
  output: {
    filename: "dist/[name].js",
    path: path.join(__dirname, ".build"),
    // publicPath: "",
  },
};
