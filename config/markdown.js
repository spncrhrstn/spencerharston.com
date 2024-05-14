const path = require("node:path");

// markdown plugins
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItImageFigures = require("markdown-it-image-figures");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItEleventyImg = require("markdown-it-eleventy-img");

// markdown plugin options
const markdownItOptions = {
  html: true
};

const markdownItAnchorOptions = {
  level: [2, 3]
};

const markdownItImageFiguresOptions = {
  figcaption: true
};

const markdownItEleventyImgOptions = {
  imgOptions: {
    widths: [480, 720, 1000],
    formats: ["webp", "jpeg"],
    urlPath: "/assets/img/content",
    outputDir: "./dist/assets/img/content",
    filenameFormat: (id, src, width, format) => {
      const { name } = path.parse(src);
      return `${name}-${width}w.${format}`;
    }
  },
  globalAttributes: {
    decoding: "async",
    loading: "lazy",
    sizes: "100vw"
  },
  resolvePath: (filepath, env) => path.join(path.dirname(env.page.inputPath), filepath)
};

const markdownLib = markdownIt(markdownItOptions)
  .use(markdownItFootnote)
  .use(markdownItAnchor, markdownItAnchorOptions)
  .use(markdownItAttrs)
  .use(markdownItImageFigures, markdownItImageFiguresOptions)
  .use(markdownItEleventyImg, markdownItEleventyImgOptions);

module.exports = { markdownLib };
