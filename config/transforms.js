const htmlMinifier = require("html-minifier-terser");

function htmlMinify(content, outputPath) {
  console.log(outputPath);
  if (outputPath.endsWith(".html")) {
    let minified = htmlMinifier.minify(content, {
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

module.exports = { htmlMinify };