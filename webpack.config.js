const path = require("path");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "mango.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode,
};
