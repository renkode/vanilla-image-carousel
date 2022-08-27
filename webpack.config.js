const path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    client: {
      overlay: false,
    },
    static: "./dist",
  },
};
