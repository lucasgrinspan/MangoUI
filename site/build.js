const Handlebars = require("handlebars");
const fs = require("fs");
const { getFileText, createFolder, writeFile, transfer } = require("./helpers");

const sitemapPath = "site-map.json";
const pageTemplatePath = "templates/docs-page.hbs";
const navTemplatePath = "templates/side-navigation.hbs";

Handlebars.registerHelper("ariaCurrent", (slug, currentSlug) => {
  return slug === currentSlug ? 'aria-current="page"' : "";
});

// builds the side navigation so that it can be injected
// into the pages
const buildNavigation = async (sitemap, current) => {
  const navigationTemplateContent = await getFileText(navTemplatePath);
  const navigationTemplate = Handlebars.compile(navigationTemplateContent, {
    noEscape: true,
  });
  const output = navigationTemplate({
    sitemap: sitemap.filter((p) => p.type === "page"),
    current,
  });
  return output;
};

// takes in a section from the sitemap and builds it
const buildPages = async ({ slug, pages, title }, template, sitemap) => {
  await createFolder(slug);

  // write the index file
  const indexNavigation = await buildNavigation(sitemap, slug);
  const indexContent = await getFileText(`pages/${slug}/index.html`);
  const indexOutput = template({
    content: indexContent,
    pageTitle: title,
    navigation: indexNavigation,
  });
  await writeFile(`${slug}/index.html`, indexOutput);
  console.log(`✅ 📄 ${title}`);

  for (const page of pages || []) {
    const { slug: pageSlug, title: pageTitle } = page;
    const content = await getFileText(`pages/${slug}/${pageSlug}.html`);

    const navigation = await buildNavigation(sitemap, pageSlug);
    const pageOutput = template({
      content,
      pageTitle,
      navigation,
    });

    await writeFile(`${slug}/${pageSlug}.html`, pageOutput);
    console.log(`  ✅ 📄 ${pageTitle}`);
  }
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
  console.log("Building site:");
  console.time("Built in");
  await createFolder("");

  // build the site from the sitemap
  for (const section of sitemap) {
    const { type, name } = section;
    switch (type) {
      case "page":
        // this one has to happen synchronously to maintain the
        // intended navigation order
        await buildPages(section, pageTemplate, sitemap);
        break;
      case "assets":
      case "copy":
      default:
        await copyAssets(name);
        break;
    }
  }

  console.log("\nOutput copied to docs/ 🎉");
  console.timeEnd("Built in");
};

console.log("Cleaning working directory...");
fs.rmSync("docs", { recursive: true, force: true });

build();
