const { generateMetaImage } = require("./meta/metaImage.js");
const { readFile } = require("fs");
const { promisify } = require("util");
const asyncReadFile = promisify(readFile);

/**
 * Async shortcode for producing an icon
 * @param string iconName The tabler icon name to use
 * @returns An SVG element for the icon
 */
async function iconify(iconName) {
  const path = `./node_modules/@tabler/icons/icons/outline/${iconName}.svg`;
  const icon = await asyncReadFile(path);
  return icon.toString();
};

// export the shortcodes separately, because nunjucks has a different method for calling async shortcodes
module.exports.shortcodes = { }
module.exports.asyncShortcodes = { iconify, generateMetaImage }