const fs = require("node:fs");

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
};

const env = process.env.ELEVENTY_ENV || "development";

const postCount = () => {
  const files = fs.readdirSync("./src/posts/", {recursive:true}).filter(item => item.endsWith(".md"));
  const drafts = files.filter(item => item.startsWith("drafts/")).length;
  const posts = files.length - drafts;
  console.log(`Posts: ${posts}`);
  console.log(`Drafts: ${drafts}`);
  
  return {
    posts: posts,
    drafts: drafts
  };
};

module.exports = { metadata, env, postCount };