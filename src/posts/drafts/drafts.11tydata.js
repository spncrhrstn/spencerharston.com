module.exports = {
  eleventyComputed: {
    draft: true,
    title: data => `[DRAFT] ${data.title}`
  }
};