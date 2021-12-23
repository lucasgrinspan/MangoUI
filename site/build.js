const Handlebars = require("handlebars");
const fs = require("fs");
const { getFileText, getFiles, createFolder, writeFile, transfer } = require("./helpers");

const sitemapPath = "site-map.json";
const pageTemplatePath = "templates/docs-page.hbs";

// takes in a section from the sitemap and builds it
const buildPages = async (section, template) => {
  await createFolder(section);
  const sectionPages = await getFiles(`pages/${section}`);

  sectionPages.forEach(async (sectionPage) => {
    const content = await getFileText(`pages/${section}/${sectionPage}`);
    const pageOutput = template({ content });
    await writeFile(`${section}/${sectionPage}`, pageOutput);
    console.log(`✅ 📄 Wrote ${section} / ${sectionPage}`);
  });
};

const copyAssets = async (assetPath) => {
  await transfer(assetPath);
  console.log(`✅ 📁 Copied asset: ${assetPath}`);
};

const build = async () => {
  const sitemap = JSON.parse(await getFileText(sitemapPath));
  const pageTemplateContent = await getFileText(pageTemplatePath);
  const pageTemplate = Handlebars.compile(pageTemplateContent, {
    noEscape: true,
    strict: true,
  });

  console.log("\nStarting build!");
  await createFolder("");

  // build the site from the sitemap
  sitemap.forEach(({ type, name }) => {
    switch (type) {
      case "page":
        buildPages(name, pageTemplate);
        break;
      case "assets":
      case "copy":
      default:
        copyAssets(name);
        break;
    }
  });
};

console.log("Cleaning working directory...");
fs.rmSync("docs", { recursive: true, force: true });

build();
