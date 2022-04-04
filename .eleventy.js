module.exports = function(eleventyConfig){

    eleventyConfig.addPassthroughCopy({
        'src/static': 'static/'
    })

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        templateFormats: [
            'md',
            'html',
            'njk'
        ],
        markdownTemplateEngine: 'njk'
    };
};