const { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate } = require("../../config/utils.js");
const { metadata } = require("../../config/config.js");
const { DateTime } = require("luxon");


/**
 * Get the information about the current build
 * @returns Object with current build info
 */
const getBuildInfo = () => {
  // const now = DateTime.now({zone: "utc"}).setZone(metadata.timezone, {keepLocalTime: true});
  const now = DateTime.now();
  const buildTime = now.toLocaleString({ 
    locale: "en-US", 
    weekday: "short", 
    month: "short", 
    year: "numeric",
    day: "2-digit", 
    hour: "numeric", 
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: metadata.timezone
  });  

  console.log(`Build time: ${now.toISO()}`);
 
  return {
    time: {
      raw: now.toISO(),
      formatted: buildTime,
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
