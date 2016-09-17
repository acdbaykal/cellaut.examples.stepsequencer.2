import path from "path";

export default {
  devtool: "source-map",
  entry: ["./src/index"],
  resolve: {
    root: [
      path.resolve("./node_modules"),
      path.resolve("./src")
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      include: [path.join(__dirname, "src")]
    }]
  }
};
