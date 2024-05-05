const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const safeLinks = require("@sardine/eleventy-plugin-external-links");
const htmlmin = require("html-minifier-terser");
const fs = require("node:fs");
const path = require("node:path");
// configure markdown plugins
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItImageFigures = require("markdown-it-image-figures");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

// const { imageHeaderShortcode, imageMetaShortcode, imageMetaTWShortcode } = require("./utils/imageGen");
const { generateMetaImages } = require("./utils/generateMetaImages.js");
const metadata = require("./src/_data/metadata.json");

function htmlminTransform(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    console.log(`[INFO] Minifying  ${outputPath}`);
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      minifyJS: true,
      minifyCSS: true
    });
    return minified;
  }
  return content;
}


/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {

  // building for production
  if (process.env.ELEVENTY_ENV === "production") {
    console.log("BUILDING FOR PRODUCTION");
    eleventyConfig.ignores.add("src/posts/drafts");
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // passthrough copying of assets files
  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets/",
    "src/assets/favicons/favicon.ico": "/favicon.ico",
    "node_modules/@fontsource/atkinson-hyperlegible/": "assets/fonts/atkinson-hyperlegible/",
    "node_modules/@fontsource/cousine/": "assets/fonts/cousine/",
    "node_modules/@tabler/icons-sprite/dist/tabler-sprite.svg": "assets/img/icons/tabler-sprite.svg"
  });

  // add watch target for css and tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // get a count of draft files
  const draftsPath = path.join(__dirname, "src/posts/drafts");
  const draftFiles = fs.readdirSync(draftsPath).filter(file => file.endsWith(".md"));
  eleventyConfig.addGlobalData("draftCount", draftFiles.length);

  // get a count of non-draft files
  const postsPath = path.join(__dirname, "src/posts");
  const postsFiles = fs.readdirSync(postsPath).filter(file => file.endsWith(".md"));
  eleventyConfig.addGlobalData("postCount", postsFiles.length);

  // filter to return a date as an ISO string
  eleventyConfig.addFilter("dateISO", (dateObj) => {
    let result = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toUTC().toISO();
    return result;
  });

  // filter to return a date as a pretty string, like April 1, 2022
  // eleventyConfig.addFilter("dateReadable", (dateObj) => {
  //   // console.log(JSON.stringify(metadata));
  //   let result = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toLocaleString(DateTime.DATE_FULL);
  //   return result;
  // });

  // shortcode to return a readable date (like April, 1 2022) or with time (April 1, 2022 at 12:12 PM MST)
  eleventyConfig.addShortcode("dateReadable", (dateObj, withTime) => {
    let result = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toLocaleString( withTime ? DateTime.DATETIME_FULL : DateTime.DATE_FULL);
    return result;
  });

  // filter to return a date as a simple date, like 2023-01-01
  eleventyConfig.addFilter("dateHtmlString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    let result = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toFormat("yyyy-LL-dd");
    return result;
  });

  // filter to return a date as a valid RFC3339 string
  eleventyConfig.addFilter("dateRFC3339", (dateObj) => {
    let s = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toUTC().toISO();

    // remove milliseconds
    let split = s.split(".");
    split.pop();

    return split.join("") + "Z";
  });

  // shortcode to format date with supplied format string
  eleventyConfig.addShortcode("dateByFormat", (dateObj, format) => {
    let result = DateTime.fromJSDate(dateObj, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toFormat(format);
    return result;
  });

  // filter for sorting a list descending
  eleventyConfig.addFilter("sortDesc", (posts) => {
    posts.sort(function (a, b) {
      return b.date - a.date;
    });
    return posts;
  });

  // filter for limiting how many items are returned in the array
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

  // filter collection by year
  eleventyConfig.addFilter("postsByYear", (collection, year) => {
    return collection.filter((entry) => DateTime.fromJSDate(entry.date).year == year);
  });

  // shortcodes
  // shortcode for returning a github link to the current page's source code
  eleventyConfig.addNunjucksShortcode("page_source_link", function (inner_text) {
    return `<a href=${this.ctx.metadata.repo}/blob/${this.ctx.git.curr_branch}${this.page.inputPath.slice(1)}>${inner_text}</a>`;
  });

  // shortcode for returning a github link to the current build commit
  eleventyConfig.addNunjucksShortcode("commit_link", function (inner_text) {
    return `<a href=${this.ctx.metadata.repo}/tree/${this.ctx.git.long_sha}>${inner_text}</a>`;
  });

  // shortcode for returning markup for an icon
  eleventyConfig.addNunjucksShortcode("iconify", function (iconName, size = "24") {
    return `<svg class="tabler-icon" width="${size}" height="${size}"><use xlink:href="/assets/img/icons/tabler-sprite.svg#tabler-${iconName}" /></svg>`;
  });

  // eleventyConfig.addNunjucksAsyncShortcode("imageHeader", imageHeaderShortcode);
  // eleventyConfig.addNunjucksAsyncShortcode("imageMeta", imageMetaShortcode);
  // eleventyConfig.addNunjucksAsyncShortcode("imageMetaTW", imageMetaTWShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("metaImages", generateMetaImages);

  // collection of all posts
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob(["./src/posts/**/*.md", "./src/posts/drafts/*.md"]);
  });

  // get a collection of all tags of a collection
  eleventyConfig.addCollection("tagList", (collection) => {
    let uniqueTags = new Set(); //sets only allow unique items

    collection.getAllSorted().forEach(function (item) {
      // skip item if there is no tags key
      if (!("tags" in item.data)) return;

      // get the tags from the item
      let tags = (typeof item.data.tags === "string") ? [item.data.tags] : item.data.tags;

      for (const tag of tags)
        tag.startsWith("_") || uniqueTags.add(tag);
    });

    return [...uniqueTags].sort();
  });

  // get a collection of years from a collection
  eleventyConfig.addCollection("yearList", (collection) => {
    let uniqueYears = new Set();

    collection.getAllSorted().forEach((item) => {
      if(!("date" in item.data)) return;
      
      // get the year of the post
      let itemYear = DateTime.fromJSDate(item.date, { zone: "utc" }).setZone(metadata.timezone, { keepLocalTime: true }).toFormat("yyyy");
      uniqueYears.add(itemYear);
    });

    return [...uniqueYears];
  });

  // configure markdown library
  let markdownItOptions = {
    html: true
  };
  
  let markdownItAnchorOptions = {
    level: [2,3]
  };

  let markdownLib = markdownIt(markdownItOptions)
    .use(markdownItFootnote)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttrs)
    .use(markdownItImageFigures, { figcaption: true, lazy: true, async: true }); // could be replaced with the image transform plugin below
  
  eleventyConfig.setLibrary("md", markdownLib);

  // add other plugins
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(safeLinks);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],
    widths: [480, 720, 1024],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "90vw",
    },
    outputDir: "./dist/assets/img/content", // relative to repo root
    urlPath: "/assets/img/content", // path prefix, e.g. `/img/` for `<img src="/img/MY_IMAGE.jpeg">`.
    filenameFormat: (id, src, width, format) => {
      const { name } = path.parse(src);
      return `${name}-${width}w.${format}`;  
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: [
      "md",
      "html",
      "njk"
    ],
    markdownTemplateEngine: "njk"
  };
};