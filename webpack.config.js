const path = require("path");

module.exports = {
  watch: true,
  mode: "development",

  entry: "./script.ts",

  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./")
  }
};
