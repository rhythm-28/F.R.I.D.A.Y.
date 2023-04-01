const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // used to serve src/index.html on a specified port
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 3000,
  },

  // as "./app.bundle.js" is attached to html file, we have to redirect it to src/index.js
  target: "web",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        include: [path.resolve(__dirname, "AI_MODELS")],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].json",
          },
        },
      },
      {
        test: /\.(mp3|wav)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      util: false,
      fs: false,
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: "./AI_MODELS/",
          from: "**/*.bin",
          to: "./",
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
