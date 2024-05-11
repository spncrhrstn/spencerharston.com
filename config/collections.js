const { DateTime } = require("luxon");

/**
 * Get the collection of all posts, including drafts
 * @param {*} collectionApi The callback function from eleventy
 * @returns An array of markdown template in the posts subdir
 */
const posts = (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("./src/posts/**/*.md");
    console.log("Posts:", posts.length);
    return posts;
};

/**
 * Get a collection of all drafts
 * @param {*} collectionApi The callback function from eleventy
 * @returns An array of markdown template in the posts/drafts subdir
 */
const drafts = (collectionApi) => {
    const drafts = collectionApi.getFilteredByGlob("./src/posts/drafts/*.md");
    console.log("Drafts: ", drafts.length);
    return drafts;
}

/**
 * Get an array of unique tags from items in all collections
 * @param {*} collectionApi The callback function for eleventy
 * @returns An array of unique tags from posts
 */
const tagList = (collectionApi) => {
    let uniqueTags = new Set();

    // just look at the posts collection
    collectionApi.getAll().forEach((item) => {
        if (!("tags" in item.data)) return;

        const tags = (typeof item.data.tags === "string") ? [item.data.tags] : item.data.tags;

        for (const tag of tags) {
            tag.startsWith("_") || uniqueTags.add(tag);
        }
    });

    console.log(`Tags [${[...uniqueTags].length}]: ${[...uniqueTags].sort()}`);

    return [...uniqueTags].sort();
};

/**
 * Get a list of years based on post dates in all collections
 * @param {*} collectionApi The callback function for eleventy
 * @returns An array of unique years from posts
 */
const yearList = (collectionApi) => {
    let uniqueYears = new Set();

    collectionApi.getAll().forEach((item) => {
        if (!item.data["date"]) return;

        const itemYear = DateTime.fromJSDate(item.date).year.toString();
        uniqueYears.add(itemYear);
    });

    console.log(`Years [${[...uniqueYears].length}]: ${[...uniqueYears].sort()}`);
    return [...uniqueYears].sort();
};

module.exports = { posts, drafts, tagList, yearList };
