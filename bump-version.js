/* eslint-disable import/no-commonjs, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, no-console */
const semver = require('semver')
const fs = require('fs')

const currentVersion = require('./package.json').version
const nextVersion = semver.inc(currentVersion, 'patch')
console.log(`Bumping version from ${currentVersion} to ${nextVersion}`)

const packageContents = fs.readFileSync('./package.json', 'utf8')
const newPackageContents = packageContents.replace(
  /"version": ".*"/,
  `"version": "${nextVersion}"`
)
fs.writeFileSync('./package.json', newPackageContents, 'utf8')
console.log('Updated package.json')

const readmeContents = fs.readFileSync('./README.md', 'utf8')
const newReadmeContents = readmeContents.replace(
  new RegExp(`v${currentVersion}`, 'g'),
  `v${nextVersion}`
)
fs.writeFileSync('./README.md', newReadmeContents, 'utf8')
console.log('Updated README.md')
