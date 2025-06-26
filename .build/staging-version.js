const simpleGit = require('simple-git');
const semver = require('semver');

const {
  calculateNextStagingVersion,
} = require('./calculateNextStagingVersion');

const git = simpleGit();

async function main() {
  // Get the current branch name using simple-git
  const branchName = await git.revparse(['--abbrev-ref', 'HEAD']);
  const iosVersion = process.argv.indexOf('--ios') > -1;
  let latestTag = null;

  // Get the latest tag on the current branch using simple-git
  try {
    // Use git.raw to run the specific describe command
    // git describe --tags --abbrev=0 gets the most recent tag reachable from HEAD
    latestTag = await git.raw(['describe', '--tags', '--abbrev=0']);
  } catch (err) {
    if (!err.message || !err.message.includes('No names found')) {
      throw err; // If it's a different git error, re-throw it
    }
  }

  const stagingVersion = calculateNextStagingVersion(branchName, latestTag);
  const baseVersion = `${semver.major(stagingVersion)}.${semver.minor(stagingVersion)}.${semver.patch(stagingVersion)}`;

  console.log(iosVersion ? baseVersion : stagingVersion);
}

main().catch((error) => {
  console.error('Script execution failed:', error);
  process.exit(1); // Exit with an error code if main fails
});
