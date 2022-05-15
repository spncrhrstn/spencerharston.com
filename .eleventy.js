const { DateTime } = require('luxon');
const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function(eleventyConfig){

    // passthrough copying of static files
    eleventyConfig.addPassthroughCopy({
        'src/static': 'static/',
        'src/favicon.ico': '/favicon.ico',
        'node_modules/@fontsource/noto-sans/': 'static/fonts/noto-sans/',
        'node_modules/@fontsource/jetbrains-mono/': 'static/fonts/jetbrains-mono/'
    });

    // filter to return a date as an ISO string
    eleventyConfig.addFilter('dateISO', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toUTC().toISO();
    });

    // filter to return dates as a pretty string, like April 1, 2022
    eleventyConfig.addFilter('datePretty', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toUTC().toLocaleString(DateTime.DATE_FULL);
    });

    // filter for sorting a list descending
    eleventyConfig.addFilter('sortDesc' , (posts) => {
        posts.sort(function(a,b){
            return b.date - a.date;
        });
        return posts;
    });

    // filter for limiting how many items are returned in the array
    eleventyConfig.addFilter('limit', (arr, limit) => arr.slice(0, limit));

    // shortcodes
    // shortcode for returing a github link to the current page's source code
    eleventyConfig.addNunjucksShortcode('page_source_link', function(inner_text){
        return `<a href=${this.ctx.metadata.repo}/blob/${ this.ctx.git.curr_branch }${ this.page.inputPath.slice(1) }>${ inner_text }</a>`;
    });

    // shortcode for returning a github link to the current build commit
    eleventyConfig.addNunjucksShortcode('commit_link', function(inner_text){
        return `<a href=${this.ctx.metadata.repo}/tree/${ this.ctx.git.long_sha }>${ inner_text }</a>`;
    });


    // if we're on production, skip any post drafts
    if(process.env.ELEVENTY_ENV == "production"){
        eleventyConfig.ignores.add("src/posts/drafts");
    }
    // collection of all posts
    eleventyConfig.addCollection('posts', (collection) => {
        return collection.getFilteredByGlob(["./src/posts/*.md", "./src/posts/drafts/*.md"]);
    });

    // get an array of all tags
    eleventyConfig.addCollection('tagList', (collection) => {
        let uniqueTags = new Set(); //sets only allow unique items

        collection.getAllSorted().forEach(function (item) {
            // skip item if there is no tags key
            if (!('tags' in item.data)) return;

            // get the tags from the item
            let tags = (typeof item.data.tags === 'string') ? [item.data.tags] : item.data.tags;

            for (const tag of tags)
                tag.startsWith('_') || uniqueTags.add(tag);
        });

        console.log('tags: ', [...uniqueTags]);
        return [...uniqueTags].sort();
    });

    // configure markdown plugins
    let markdownIt = require('markdown-it');
    let markdownItFootnote = require('markdown-it-footnote');
    let markdownItImageFigures = require('markdown-it-image-figures');
    let mdiOptions = {
        html: true
    };
    let markdownLib = markdownIt(mdiOptions)
        .use(markdownItFootnote)
        .use(markdownItImageFigures, { figcaption: true, lazy: true, async: true });
    eleventyConfig.setLibrary('md', markdownLib);

    // add other plugins
    eleventyConfig.addPlugin(readingTime);
    eleventyConfig.addPlugin(pluginRss);

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: "_includes",
            data: "_data"
        },
        templateFormats: [
            'md',
            'html',
            'njk'
        ],
        markdownTemplateEngine: 'njk'
    };
};