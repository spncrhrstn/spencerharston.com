const { DateTime } = require('luxon');

module.exports = function(eleventyConfig){

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({
        'src/static': 'static/',
        'src/favicon.ico': '/favicon.ico'
    })

    // fitler to return a date as an ISO string
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

    eleventyConfig.addFilter('mostRecent', (collection) => {
        console.log(collection);
        return collection;
    })

    // collection of posts
    eleventyConfig.addCollection('posts', (collection) => {
        return collection.getFilteredByGlob('./src/posts/*.md');
    });

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