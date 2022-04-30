module.exports = {
    eleventyComputed: {
        layout: () => {
            return "layouts/post"
        },
        permalink: (data) => {
            console.log(process.env.ELEVENTY_ENV);
            if(process.env.ELEVENTY_ENV !== "production") return data.permalink;
            else return data.draft ? false : data.permalink;
        }
    }
}