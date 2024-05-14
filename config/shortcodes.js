const { generateMetaImage } = require("./meta/metaImage.js");
const { readFile } = require("fs");
const { promisify } = require("util");
const { metadata } = require("./config.js");
const { getCurrentGitBranch } = require("./utils.js");
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

function pageSourceUrl() {
  const branch = getCurrentGitBranch();
  return `${metadata.repo}/blob/${branch}/${this.page.inputPath.slice(2)}`;
}

module.exports.shortcodes = { pageSourceUrl }
module.exports.asyncShortcodes = { iconify, generateMetaImage }