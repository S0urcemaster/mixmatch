const webpack = require("webpack");

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.DefinePlugin({
    "process.env": "{}",
    // global: {}
  }),
  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: "mp3/*",
  //     },
  //   ],
  // }),

];
