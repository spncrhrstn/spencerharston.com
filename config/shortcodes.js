const { metadata } = require("./config");
const { generateMetaImage } = require("./meta/metaImage.js");
const git = require("async-git");
const { readFile } = require("fs");
const { promisify } = require("util");
const asyncReadFile = promisify(readFile);

/**
 * Async shortcode for creating a link to the current page's source code
 * @param string innerText Inner text of the HTML
 * @returns An HTML <a> link to the current page's source code
 */
async function pageSourceLink(innerText) {
    const curr_branch = await git.branch;
    return `<a href=${metadata.repo}/blob/${curr_branch}${this.page.inputPath.slice(1)}>${innerText}</a>`;
};

/**
 * Async shortcode for creating a link to the current commit of the site
 * @param string innerText Inner text of the HTML
 * @returns An HTML <a> link to the current commit of the site
 */
async function commitLink(innerText) {
    const long_sha = await git.sha;
    return `<a href=${metadata.repo}/tree/${long_sha}>${innerText}</a>`;
};

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

module.exports = { pageSourceLink, commitLink, iconify, generateMetaImage };