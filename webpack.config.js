const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//let env = process.env.ENV;

//Define Entry Points for the Webpack
let config = {
  entry :{
    app: "./src/index.js"
  },
  output :{
    path: path.resolve("dist"),
    filename: "[name].[hash].js",
    publicPath : "/"
  }
};

config["devServer"] = {
  contentBase: path.join(__dirname, 'dist'),
  historyApiFallback: true
}

// List of Plugins to be Used for building
config["plugins"] = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })
]

//Enable Source Map
//if(env != "production"){
  config["devtool"] = "source-maps";
//}

// Modules
config["module"] = {
  rules : [
    {
      test : /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },
    {
      test : /\.css/,
      use : [
        "style-loader",
        "css-loader",
      ]
    },
    {
      test : /\.scss/,
      use : [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    }
  ]
}
module.exports = {...config};

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: "style-loader"
//           },
//           {
//             loader: "css-loader",
//             options: {
//               modules: true,
//               importLoaders: 1,
//               localIdentName: "[name]_[local]_[hash:base64]",
//               sourceMap: true,
//               minimize: true
//             }
//           }
//         ]
//       }
//     ]
//   }
// }