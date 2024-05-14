// Packages
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const safeLinks = require("@sardine/eleventy-plugin-external-links");

// Custom configs
const config = require("./config/config.js");
const filters = require("./config/filters.js");
const shortcodes = require("./config/shortcodes.js");
const collections = require("./config/collections.js");
const { htmlMinify } = require("./config/transforms.js");
const { markdownLib } = require("./config/markdown.js");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {

  // building for production
  if (process.env.ELEVENTY_ENV === "production") {
    console.log("BUILDING FOR PRODUCTION");
    eleventyConfig.ignores.add("src/posts/drafts");
    eleventyConfig.addTransform("htmlmin", htmlMinify);
  }

  // passthrough copying of assets files
  eleventyConfig.addPassthroughCopy({ "src/assets/scripts/": "assets/scripts/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicons/": "assets/favicons/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicons/favicon.ico": "/favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img/*[!content]": "assets/img/" }); // images except /content, handled by eleventy-img plugin
  eleventyConfig.addPassthroughCopy({ "node_modules/@fontsource": "assets/fonts" }); // copy all fonts, for now, need to optimize further

  // add watch target for css and tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // add global data
  eleventyConfig.addGlobalData("postCount", collections.posts.length);
  eleventyConfig.addGlobalData("draftCount", collections.drafts.length);
  Object.entries(config).forEach(([name, data]) => eleventyConfig.addGlobalData(name, data));

  // add shortcodes
  Object.entries(shortcodes.shortcodes).forEach(([name, func]) => eleventyConfig.addShortcode(name, func));
  Object.entries(shortcodes.asyncShortcodes).forEach(([name, func]) => eleventyConfig.addNunjucksAsyncShortcode(name, func));
  
  // add filters
  Object.entries(filters).forEach(([name, func]) => eleventyConfig.addNunjucksFilter(name, func));
  
  // add collections
  Object.entries(collections).forEach(([name, func]) => eleventyConfig.addCollection(name, func));

  // configure markdown library
  eleventyConfig.setLibrary("md", markdownLib);

  // add other plugins
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(safeLinks);

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