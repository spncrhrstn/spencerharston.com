# spencerharston.com

![Eleventy](https://img.shields.io/badge/eleventy-2.0.1-blue)

The personal website of Spencer Harston - an eternal WIP.

## Fork This Website

This site can be copied and modified for personal use by forking and modifying as needed.

> **Note**  
> While you are free to copy the source code of this website, be aware that the site generation process is rather opinionated, not optimized, and may not fit your needs. And of course the content is of my own creation. See [LICENSE](#license) below.

### Requirements
* Node v16 or greater (using [nvm](https://github.com/nvm-sh/nvm) is suggested)
* Git

### Fork and Install Dependencies

Fork this repository in GitHub, give it a new name, then run the following on your machine:

```
git clone NEW_REPO_GIT_URL
cd NEW_REPO_NAME
npm install
```

### Running Locally

During development, the site can be ran "live", which will reload itself as changes are made. Run the following command:

```
npm run start
```
Open a browser to `http://localhost:8080`. This will watch for code changes and reload the page automatically.

To skip using a local server, you can also just build the website with

```
npm run build
```
Building the website outputs all resulting files in the `dist/` directory.

### Building for Production
Using environment variables, the site can be built for production, which will do a couple of things differently:

 - Skip any draft pages in `src/posts/drafts`
 - Generate images for HTML `meta` tags, which makes the build process take longer
 - Minimize the CSS and HTML files 

To build for production, set the `ELEVENTY_ENV` environment variable to `production`, like so:

```
ELEVENTY_ENV=production npm run build
```
The site's output will be in the `dist` directory and can be used for deployment.

## Changing Fonts
To change fonts, there's a few steps to take.
1. Install the font package from [Fontsource](https://fontsource.org/)
2. Update the `addPassthroughCopy` function in `./eleventy.config.js` to copy the package contents to the build directory
3. Update `./src/styles/site.css` to import the needed Fontsource CSS files (at least the `400.css` file)
4. Update `./tailwind.config.js` under `theme.extend.fontFamily` to set the font family 
5. Get the font's `.ttf` files (from Fontsource's website directly or Google Fonts) and copy to `./utils` to generate the meta images
    - The Fontsource npm packages don't include the `.ttf` files
    - Update the `registerFont` functions and any `ctx.font` variables in `./utils/metaImages.js` to needed values
6. Go to [favicon.io](https://favicon.io) to create the new favicons and copy them to `./src/static/favicons`
    - You may need to add a new `v=` value to the link hrefs in `./src/_includes/partials/head.njk` to bust caching


## Credits

* Built with [Eleventy](https://www.11ty.dev)
* Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)
* More on the [Colophon page](https://www.spencerharston.com/colophon)


# LICENSE
The source code to generate this website is licensed under the [MIT license](/LICENSE). The content of this site is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).