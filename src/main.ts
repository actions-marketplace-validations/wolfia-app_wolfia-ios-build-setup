import * as core from '@actions/core'
import {getInputs} from './inputs'
import {getToken} from './jwt'

async function run(): Promise<void> {
  core.info(`Completed.`)

  const {
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret
  } = getInputs()

  const token = getToken({
    appStoreConnectApiKey,
    appStoreConnectApiIssuer,
    appStoreConnectSecret
  })

  // eslint-disable-next-line no-console
  console.log(`Token: ${token}`)
}

run()
