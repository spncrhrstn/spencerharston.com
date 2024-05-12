const metadata = {
  title: "Spencer Harston",
  description: "The personal website of Spencer Harston",
  author: "Spencer Harston",
  owner: "Spencer Harston",
  repo: "https://github.com/sphars/spencerharston.com",
  base_url: "https://www.spencerharston.com",
  domain: "spencerharston.com",
  github_handle: "sphars",
  mastodon_handle: "@sphars",
  timezone: "America/Denver"
}

function env() {
  return {
    environment: process.env.ELEVENTY_ENV || "development"
  }
}

module.exports = { metadata, env };