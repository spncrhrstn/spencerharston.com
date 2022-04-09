const { DateTime } = require('luxon');

module.exports = function(eleventyConfig){

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({
        'src/static': 'static/',
        'src/favicon.ico': '/favicon.ico'
    })

    // filter to return dates as pretty string, like April 1, 2022
    eleventyConfig.addFilter('prettyDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

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