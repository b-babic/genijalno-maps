const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
  "whatwg-fetch",
  "prop-types",
  "react",
  "react-dom",
  "react-redux",
  "react-router-dom",
  "redux",
  "redux-thunk",
  "redux-logger"
];

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS
  },
  module: {
    rules: [
      /* JS */
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      /* SCSS */
      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: "./config/postcss.config.js"
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js"]
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
