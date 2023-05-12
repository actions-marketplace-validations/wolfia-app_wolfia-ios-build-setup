import axios from 'axios'

const APP_STORE_CONNECT_API_BASE = 'https://api.appstoreconnect.apple.com'

interface APIResponse<Result> {
  data: Result
}

// eslint-disable-next-line no-shadow
export enum ProfileState {
  ACTIVE = 'ACTIVE',
  INVALID = 'INVALID'
}

interface Profile {
  id: string
  attributes: {
    name: string
    profileState: ProfileState
    profileContent: string
  }
}

export class API {
  token: string

  constructor(token: string) {
    this.token = token
  }

  private async get<Result>(resource: string): Promise<Result> {
    const response = await axios.get<Result>(
      `${APP_STORE_CONNECT_API_BASE}${resource}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )

    return response.data
  }

  async getProfiles(): Promise<APIResponse<Profile[]>> {
    return this.get('/v1/profiles')
  }
}
