const semver = require('semver');
const { extractVersionFromBranch } = require('./extractVersionFromBranch');

/**
 * Calculates the next 'staging' prerelease version
 * based on the current branch name and the latest Git tag.
 * The version format will be x.y.z-staging.N
 * @param branchName The release branch name
 * @param latestTag The latest tag found on the release branch
 * @returns {Promise<string>} The calculated next version (e.g., "1.2.3-staging.0", "1.2.3-staging.4").
 */
function calculateNextStagingVersion(branchName, latestTag = null) {
  // Make the function asynchronous
  let branchBaseVersion;
  let currentVersionToIncrement;

  // Extract the base version from the branch name (release/x.y.z)
  branchBaseVersion = extractVersionFromBranch(branchName);

  // Compare the tag with the branch version
  const isTagValid = latestTag && semver.valid(latestTag);

  if (isTagValid) {
    // Get the base version (major.minor.patch) from the valid tag by combining parts
    const tagBaseVersion = `${semver.major(latestTag)}.${semver.minor(latestTag)}.${semver.patch(latestTag)}`;

    if (semver.eq(tagBaseVersion, branchBaseVersion)) {
      // The tag is valid and its base version matches the branch.
      // Use this tag as the starting point for the next 'staging' increment.
      currentVersionToIncrement = latestTag;
    } else {
      // The tag is valid but doesn't match the branch version.
      // Ignore this tag and start staging numbering from the branch version.
      currentVersionToIncrement = branchBaseVersion;
    }
  } else {
    // No valid or relevant tag found
    // Use the branch base version as the starting point.
    currentVersionToIncrement = branchBaseVersion;
  }

  // Calculate the next 'staging' prerelease version
  const nextVersion = semver.inc(currentVersionToIncrement, 'pre', 'staging');

  if (!nextVersion) {
    // This case is unlikely if currentVersionToIncrement is a valid semver or can be coerced by semver.inc
    throw new Error(
      `Could not calculate the next version from "${currentVersionToIncrement}" with identifier "staging".`,
    );
  }

  return nextVersion;
}

module.exports = {
  calculateNextStagingVersion,
};
