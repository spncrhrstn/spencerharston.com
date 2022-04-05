module.exports = function(eleventyConfig){

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({
        'src/static': 'static/'
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