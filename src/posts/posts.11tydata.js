module.exports = {
  eleventyComputed: {
    layout: "layouts/post",
    permalink: "posts/{{ page.fileSlug }}/",
    type: "post"
  }
};