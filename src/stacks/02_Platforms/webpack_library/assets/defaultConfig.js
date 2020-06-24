exports.WEBPACK_CONFIG = {
  module: {},
  target: "web",
  entry: {
    mylib: () => `path.resolve(__dirname, "index.js")`
  },

  output: {
    filename: "[name].js",
    path: () => `path.resolve(__dirname, "dist")`,
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  mode: "production",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      filename: "[name].min.js",
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};

exports.WEBPACK_DEV_CONFIG = {
  module: {},
  target: "web",
  entry: {
    mylib: () => `path.resolve(__dirname, "index.js")`
  },

  output: {
    filename: "[name].js",
    path: () => `path.resolve(__dirname, "dist")`,
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  mode: "development",

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      filename: "[name].min.js",
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
