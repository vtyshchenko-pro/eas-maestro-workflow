const {
  calculateNextStagingVersion,
} = require('./calculateNextStagingVersion');

describe('calculateNextStagingVersion Tests', () => {
  test('Should return the branch name version if no tag found', () => {
    const nextStagingVersion = calculateNextStagingVersion('release/1.6.0');
    expect(nextStagingVersion).toStrictEqual('1.6.0-staging.0');
  });

  test('Should return the branch name version if the tag is not a valid version', () => {
    const nextStagingVersion = calculateNextStagingVersion(
      'release/1.6.0',
      'feature',
    );
    expect(nextStagingVersion).toStrictEqual('1.6.0-staging.0');
  });

  test('Should return the next version if a valid tag is provided', () => {
    const nextStagingVersion = calculateNextStagingVersion(
      'release/1.6.0',
      '1.6.0-staging.5',
    );
    expect(nextStagingVersion).toStrictEqual('1.6.0-staging.6');
  });

  test('Should return the branch name version if the tag is a valid version but does not match the branch version', () => {
    const nextStagingVersion = calculateNextStagingVersion(
      'release/1.6.0',
      '1.5.0-staging.5',
    );
    expect(nextStagingVersion).toStrictEqual('1.6.0-staging.0');
  });
});
