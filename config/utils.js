const childProcess = require('child_process');

const spawnAndGetOutputString = (commandString) => {
  return childProcess
    .execSync(commandString)
    .toString()
    .trim();
}

const getLatestGitCommitHash = (format = 'long') => spawnAndGetOutputString(`git rev-parse ${format === 'short' ? '--short' : ''} HEAD`);

const getCurrentGitBranch = () => spawnAndGetOutputString(`git branch --show-current`);

const getCurrentGitCommitDate = () => spawnAndGetOutputString(`git log -n1 --format=%cd --date=iso-strict`);

module.exports = { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate }