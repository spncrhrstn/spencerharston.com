const { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate, getCurrentGitStatus } = require("../../config/utils.js");
const { metadata } = require("../../config/config.js");

/**
 * Get the information about the current build
 * @returns Object with current build info
 */
const getBuildInfo = () => {
  const now = new Date();
  const buildTime = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: metadata.timezone,
  }).format(now);

  const tzAbbr = now.toLocaleString('en-US', { timeZoneName: "short"}).split(/\s+/).pop();

  console.log(getCurrentGitStatus());

  return {
    // Can't use timeZoneName option together with dateStyle, so interpolate manually
    time: {
      raw: now.toISOString(),
      formatted: `${buildTime} ${tzAbbr}`,
    },
    git: {
      hash: {
        short: getLatestGitCommitHash("short"),
        long: getLatestGitCommitHash("long")
      },
      branch: getCurrentGitBranch(),
      commitDate: getCurrentGitCommitDate()
    }

  };
};

module.exports = getBuildInfo;
