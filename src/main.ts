import * as core from '@actions/core'
import {getInputs} from './inputs'
import {getToken} from './jwt'

import {API, ProfileState} from './api'

async function run(): Promise<void> {
  const {
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret,
    profileName
  } = getInputs()

  core.info(`Generating JWT...`)
  const token = getToken({
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret
  })
  const api = new API(token)

  core.info(`Fetching profiles...`)
  const profiles = await api.getProfiles()
  const profile = profiles.data.find(
    prof => prof.attributes.name === profileName
  )

  if (!profile) {
    core.setFailed(
      `Profile "${profileName}" not found. Please confirm the profile name is correct and exists.`
    )
    return
  }

  if (profile.attributes.profileState !== ProfileState.ACTIVE) {
    core.setFailed(
      `Profile "${profileName}" is ${profile.attributes.profileState}. Please confirm the profile is active and valid.`
    )
    return
  }

  core.info(`Profile "${profileName}" found.`)
  // Hide the value from being output in logs.
  core.setSecret(profile.attributes.profileContent)
  // Output the value so subsequent steps can use it.
  core.setOutput('provisioning-profile', profile.attributes.profileContent)
}

run()
