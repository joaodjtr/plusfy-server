import {config} from 'dotenv'
config()

export const client_id = process.env.CLIENT_ID ?? ''
export const client_secret = process.env.CLIENT_SECRET ?? ''
export const redirect_uri = process.env.REDIRECT_URI ?? ''
export const client_redirect_url = process.env.CLIENT_REDIRECT_URL ?? ''
export const authorizations = "user-read-private user-read-email streaming user-read-playback-state user-library-read user-library-modify playlist-modify-public playlist-modify-private user-top-read playlist-read-collaborative playlist-read-private"
export const stateKey = "spotify_auth_state"
export const PORT = process.env.PORT || 8888