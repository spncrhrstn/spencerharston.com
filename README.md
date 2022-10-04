# spencerharston.com

![Netlify](https://img.shields.io/netlify/5b157e12-c172-4459-880f-c6d18b71ec0f?)
![Eleventy](https://img.shields.io/badge/eleventy-1.0.2-blue)

The personal website of Spencer Harston - an eternal WIP.

## Copy This Website

This site can be copied and modified for personal use by forking and modifying as needed.

### Requirements
* Node v16 or greater (using [nvm](https://github.com/nvm-sh/nvm) is suggested)
* Git

### Fork and Install Dependencies

Fork this repository, give it a new name, then run the following:

```
git clone NEW_REPO_GIT_URL
cd NEW_REPO_NAME
npm install
```

### Running Locally

During development, the site can be ran "live", which will reload itself as changes are made. Run the following command:

```
npm run dev
```
Open a browser to `http://localhost:8080`. This will watch for code changes and reload the page automatically.

### Building for production
Using environment variables, the site can be built for production, which will skip any draft pages in the `src/posts/drafts` directory. 

Use the following command:

```
ELEVENTY_ENV=production npm run prod
```
The site's output will be in the `dist` directory and can be used for deployment.

## Credits

* Built with [Eleventy](https://www.11ty.dev)
* Deployed on [Netlify](https://www.netlify.com)
* More on the [Colophon page](https://www.spencerharston.com/colophon)