/* eslint-disable import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const {execSync} = require('child_process')
const semver = require('semver')

const latestVersion = execSync(
  'git describe --tags `git rev-list --tags --max-count=1`'
)
  .toString()
  .trim()
  .replace('v', '')

const currentVersion = require('./package.json').version

if (semver.lte(currentVersion, latestVersion)) {
  throw new Error(
    `The current version (${currentVersion}) is the same (or below) the latest release (${latestVersion}). Run "npm run bump-version" and commit the changes.`
  )
}
