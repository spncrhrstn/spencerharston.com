const image = require("@11ty/eleventy-img");

// some functions to fetch an image from unsplash and format it to be an html meta image

// get and generate an image for display on a page
async function imageHeaderShortcode(src, alt, sizes) {

  // add some crop parameters from unsplash
  src = src + "?ixlib=rb-1.2.1&fit=crop&crop=edges&h=270&w=928&q=100&auto=format";

  let metadata = await image(src, {
    widths: [928, 400],
    formats: ["webp", "jpeg"],
    urlPath: `/${this.ctx.permalink}/images`,
    outputDir: `./dist/${this.ctx.permalink}/images`,
    sharpJpegOptions: { quality: 90 },
    sharpWebpOptions: { quality: 90 },
    filenameFormat: function (id, src, width, format, options) {
      return `header-${width}w.${format}`;
    }
  });

  let imageAttrs = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    "style": "object-fit: cover; object-position:center center; max-width: 100%; height: auto; aspect-ratio: 24/7;"
  };

  return image.generateHTML(metadata, imageAttrs);
}

// generate the meta image
async function imageMetaShortcode(src) {
  src = src + "?ixlib=rb-1.2.1&fit=crop&crop=edges&h=630&w=1200&q=100&auto=format";

  let metadata = await image(src, {
    widths: [1200],
    formats: ["jpeg"],
    urlPath: `/${this.ctx.permalink}/images`,
    outputDir: `./dist/${this.ctx.permalink}/images`,
    sharpJpegOptions: { quality: 90 },
    filenameFormat: function (id, src, width, format, options) {
      const name = "meta";
      return `${name}-${width}w.${format}`;
    }
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `${this.ctx.metadata.base_url}${data.url}`;
}

// generate a meta image for twitter
async function imageMetaTWShortcode(src) {
  src = src + "?ixlib=rb-1.2.1&fit=crop&crop=edges&h=600&w=1200&q=100&auto=format";

  let metadata = await image(src, {
    widths: [1200],
    formats: ["jpeg"],
    urlPath: `/${this.ctx.permalink}/images`,
    outputDir: `./dist/${this.ctx.permalink}/images`,
    sharpJpegOptions: { quality: 90 },
    filenameFormat: function (id, src, width, format, options) {
      const name = "meta-tw";
      return `${name}-${width}w.${format}`;
    }
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `${this.ctx.metadata.base_url}${data.url}`;
}


exports.imageHeaderShortcode = imageHeaderShortcode;
exports.imageMetaShortcode = imageMetaShortcode;
exports.imageMetaTWShortcode = imageMetaTWShortcode;