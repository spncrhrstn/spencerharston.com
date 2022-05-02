module.exports = {
    eleventyComputed: {
        draft: true,
        title: data => "[draft] " + data.title
    }
}