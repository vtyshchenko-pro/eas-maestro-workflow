const simpleGit = require('simple-git');
const { getStableVersionFromTag } = require('./getStableVersionFromTag');

const git = simpleGit();

async function main() {
  const latestTag = await git.raw(['describe', '--tags', '--abbrev=0']);
  const version = getStableVersionFromTag(latestTag);
  console.log(version);
}

main().catch((error) => {
  console.error('Script execution failed:', error);
  process.exit(1); // Exit with an error code if main fails
});
