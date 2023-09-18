const nodeExternals = require("webpack-node-externals");
const path = require("path");

const serverConfig = {
  target: "node",
  mode: "development",
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry: {
    "server.js": path.resolve(__dirname, "src/server.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
};

const clientConfig = {
  mode: "development",
  target: "web",
  entry: {
    "app": path.resolve(__dirname, "src/app/index.js")
  },
  module:{
    rules: [
      {
        test: /\.js$/, // Use the babel-loader for .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      }
      // {
      //   test: /\.html$/, // Use the html-loader for .html files
      //   use: ['html-loader'],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "[name].bundle.js",
  }
};

module.exports = [clientConfig, serverConfig];
