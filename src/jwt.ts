import jwt, {SignOptions} from 'jsonwebtoken'

const getNowSeconds = (): number => Math.round(new Date().getTime() / 1000)

const EXPIRATION_TIME = 10 * 60 // 10 minutes

export const getToken = ({
  appStoreConnectApiKey,
  appStoreConnectApiIssuer,
  appStoreConnectSecret
}: {
  appStoreConnectApiKey: string
  appStoreConnectApiIssuer: string
  appStoreConnectSecret: string
}): string => {
  const exp = getNowSeconds() + EXPIRATION_TIME

  const payload = {
    iss: appStoreConnectApiIssuer,
    exp,
    aud: 'appstoreconnect-v1'
  }

  const options: SignOptions = {
    algorithm: 'ES256',
    header: {
      typ: 'JWT',
      alg: 'ES256',
      kid: appStoreConnectApiKey
    }
  }

  return jwt.sign(payload, appStoreConnectSecret, options)
}
