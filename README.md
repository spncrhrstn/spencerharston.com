# spencerharston.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b157e12-c172-4459-880f-c6d18b71ec0f/deploy-status)](https://app.netlify.com/sites/spencerharston/deploys)
![Eleventy](https://img.shields.io/badge/eleventy-2.0.0-blue)

The personal website of Spencer Harston - an eternal WIP.

## Fork This Website

This site can be copied and modified for personal use by forking and modifying as needed.

> **Note**  
> While you are free to copy this website, be aware that the site generation process is rather opinionated, not optimized, and may not fit your personal preferences. And of course the content is of my own creation.

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

To build for production, set the `ELEVENTY_ENV` to `production`, like so:

```
ELEVENTY_ENV=production npm run build
```
The site's output will be in the `dist` directory and can be used for deployment.

## Credits

* Built with [Eleventy](https://www.11ty.dev)
* Deployed on [Netlify](https://www.netlify.com)
* More on the [Colophon page](https://www.spencerharston.com/colophon)