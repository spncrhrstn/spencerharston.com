module.exports = {
  eleventyComputed: {
    layout: "layouts/post",
    permalink: "posts/{{ page.date | year }}/{{ title | slugify }}/",
    type: "post"
    // ,redirectFrom: "/posts/{{ page.fileSlug }}/"
  }
};