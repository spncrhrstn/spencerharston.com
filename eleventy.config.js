// External packages/plugins
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
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig 
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {

  // building for production
  if (process.env.ELEVENTY_ENV === "production") {
    console.log("BUILDING FOR PRODUCTION");
    eleventyConfig.ignores.add("src/posts/drafts");
    eleventyConfig.addTransform("htmlmin", htmlMinify);
    eleventyConfig.quietMode = true;
  }

  // passthrough copying of assets files
  // images, except those in /content subdir as they're handled by the markdown-it-eleventy-img plugin
  // all fonts are copied over for now. TODO: optimize for specific font files
  eleventyConfig.addPassthroughCopy({ 
    "src/assets/scripts/": "assets/scripts/",
    "src/assets/favicons/": "assets/favicons/",
    "src/assets/favicons/favicon.ico": "/favicon.ico",
    "src/assets/img/*[!content]": "assets/img/",
    "node_modules/@fontsource/atkinson-hyperlegible/": "assets/fonts/atkinson-hyperlegible/",
    "node_modules/@fontsource/cousine/": "assets/fonts/cousine/"
  });

  // add watch target for css and tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // add global data
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