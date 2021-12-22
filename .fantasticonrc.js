// build file for font icons
module.exports = {
  name: "mango-icons",
  inputDir: "assets/icons",
  outputDir: "assets/font",
  fontTypes: ["woff2"],
  assetTypes: ["scss"],
  fontsUrl: "../../assets/font",
  pathOptions: {
    scss: "src/tokens/_icons.scss",
  },
  templates: {
    scss: "templates/scss-icon.hbs",
  },
  tag: "span",
  selector: ".icon",
};
