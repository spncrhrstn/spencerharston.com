// packages
const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const safeLinks = require("@sardine/eleventy-plugin-external-links");
const fs = require("node:fs");
const path = require("node:path");

// Custom configs
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
  eleventyConfig.addPassthroughCopy({ "node_modules/@fontsource/atkinson-hyperlegible/": "assets/fonts/atkinson-hyperlegible/" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fontsource/cousine/": "assets/fonts/cousine/" });

  // add watch target for css and tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // add global data
  eleventyConfig.addGlobalData("postCount", collections.posts.length);
  eleventyConfig.addGlobalData("draftCount", collections.drafts.length);

  // add filters
  Object.entries(filters).forEach(([name, func]) => eleventyConfig.addNunjucksFilter(name, func));
  
  // add shortcodes
  Object.entries(shortcodes).forEach(([name, func]) => eleventyConfig.addNunjucksAsyncShortcode(name, func)); 

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