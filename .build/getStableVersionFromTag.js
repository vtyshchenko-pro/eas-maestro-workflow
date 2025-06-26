const semver = require('semver');

const PRE_PRODUCTION_RELEASE = 'staging';

function getStableVersionFromTag(tag) {
  const validTag = semver.valid(tag);

  if (!validTag) {
    throw new Error(
      `Latest reachable tag "${tag}" is not a valid semantic version.`,
    );
  }

  const prerelease = semver.prerelease(validTag);

  // Check if it has a prerelease part and the first identifier is exactly PRE_PRODUCTION_RELEASE
  if (
    !prerelease ||
    prerelease.length === 0 ||
    prerelease[0] !== PRE_PRODUCTION_RELEASE
  ) {
    throw new Error(
      `Latest reachable tag "${tag}" is a valid semver, but it is not a ${PRE_PRODUCTION_RELEASE} prerelease (expected format x.y.z-${staging}.N).`,
    );
  }

  const productionVersion = `${semver.major(validTag)}.${semver.minor(validTag)}.${semver.patch(validTag)}`;

  return productionVersion;
}

module.exports = {
  PRE_PRODUCTION_RELEASE,
  getStableVersionFromTag,
};
