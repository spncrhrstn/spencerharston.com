const { getLatestGitCommitHash, getCurrentGitBranch, getCurrentGitCommitDate, getGitVersion } = require("../../config/utils.js");
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
  const now = DateTime.now();
  const buildTime = now.toFormat(dateFormatString);

  console.log(`Build time: ${now.toISO()}`);

  console.log(getGitVersion());

  const gitCommitJSDate = DateTime.fromISO(getCurrentGitCommitDate())
    .toFormat(dateFormatString);

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
      commitDate: getCurrentGitCommitDate(),
      commitDateFormatted: gitCommitJSDate
    }

  };
};

module.exports = getBuildInfo;
