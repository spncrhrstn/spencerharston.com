module.exports = {
  eleventyComputed: {
    layout: "layouts/post",
    permalink: "posts/{{ title | slugify }}/",
    type: "post"
  }
};