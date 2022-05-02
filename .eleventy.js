const { DateTime } = require('luxon');

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

    // configure markdown plugins
    let markdownItFootnote = require('markdown-it-footnote');
    let mdiOptions = {
        html: true
    };
    let markdownLib = require('markdown-it')(mdiOptions).use(markdownItFootnote);
    eleventyConfig.setLibrary('md', markdownLib);

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