const { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate } = require("../../config/utils.js");
const { metadata } = require("../../config/config.js");
const { dateByFormat } = require("../../config/filters.js");
const { DateTime } = require("luxon");


/**
 * Get the information about the current build
 * @returns Object with current build info
 */
const getBuildInfo = () => {
  // const now = DateTime.now({zone: "utc"}).setZone(metadata.timezone, {keepLocalTime: true});
  const dateFormatString = "EEE, MMM dd, y 'at' h:mm:ss a ZZZZ";
  const buildTime = DateTime.now();
  const buildTimeFormatted = buildTime.setZone(metadata.timezone).toFormat(dateFormatString);

  console.log(`Build time: ${buildTime.toISO()}`);

  const gitCommitJSDate = DateTime.fromISO(getCurrentGitCommitDate()).setZone(metadata.timezone)
    .toFormat(dateFormatString);

  return {
    time: {
      raw: buildTime.toISO(),
      formatted: buildTimeFormatted,
    },
    git: {
      hash: {
        short: getLatestGitCommitHash("short"),
        long: getLatestGitCommitHash("long")
      },
      branch: getCurrentGitBranch(),
      commitDate: getCurrentGitCommitDate(),
      commitDateFormatted: gitCommitJSDate
    }

  };
};

module.exports = getBuildInfo;
