const semver = require('semver');

function extractVersionFromBranch(branchName) {
  const branchMatch = branchName.match(/^release\/(.+)$/);
  if (!branchMatch || !semver.valid(branchMatch[1])) {
    throw new Error(
      `Branch name "${branchName}" does not match the "release/x.y.z" format or the extracted version is not valid.`,
    );
  }

  return branchMatch[1];
}

module.exports = {
  extractVersionFromBranch,
};
