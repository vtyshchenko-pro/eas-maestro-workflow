const { getStableVersionFromTag } = require('./getStableVersionFromTag');

describe('getStableVersionFromTag Tests', () => {
  test('Should return the stable version part of version', () => {
    const version = getStableVersionFromTag('v1.2.0-staging.14');
    expect(version).toStrictEqual('1.2.0');
  });

  test("Should throw if the last tag found is not a 'staging' pre-release", () => {
    expect(() => getStableVersionFromTag('v1.2.0-beta.14')).toThrow();
  });
});
