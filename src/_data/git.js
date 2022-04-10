const git = require('async-git');

module.exports = async function () {
    let ret = {
        commit_sha: await git.short,
        curr_branch: await git.branch,
        commit_date: await git.date,
        origin: await git.origin,
        name: await git.name,
        repo: "spencerharston.com"
    }

    return ret;
}