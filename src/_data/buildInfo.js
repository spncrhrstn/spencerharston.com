const { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate } = require("../../config/utils.js");
const { metadata } = require("../../config/config.js");
const { DateTime } = require("luxon");


/**
 * Get the information about the current build
 * @returns Object with current build info
 */
const getBuildInfo = () => {
  const dateFormatString = "EEE, MMM dd, y 'at' h:mm:ss a ZZZZ";
  
  const gitDateRaw = DateTime.fromISO(getCurrentGitCommitDate());
  const gitDateFormatted = gitDateRaw.setZone(metadata.timezone).toFormat(dateFormatString);
  
  const buildTime = DateTime.now();
  const buildTimeRaw = buildTime.toISO();
  const buildTimeFormatted = buildTime.setZone(metadata.timezone).toFormat(dateFormatString);
  
  console.log(`Commit time: ${gitDateRaw}`);
  console.log(`Build time: ${buildTimeRaw}`);

  return {
    git: {
      hash: {
        short: getLatestGitCommitHash("short"),
        long: getLatestGitCommitHash("long")
      },
      time: {
        raw: gitDateRaw,
        formatted: gitDateFormatted
      },
      branch: getCurrentGitBranch()
    },
    time: {
      raw: buildTimeRaw,
      formatted: buildTimeFormatted,
    }
  };
};

module.exports = getBuildInfo;
