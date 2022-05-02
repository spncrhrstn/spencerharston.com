const git = require('async-git');

module.exports = async function () {
    let ret = {
        short_sha: await git.short,
        long_sha: await git.sha,
        curr_branch: await git.branch,
        commit_date: await git.date,
        repo: "spencerharston.com"
    }

    return ret;
}