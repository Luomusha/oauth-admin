
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173/callback"
export const OAUTH_HOST = import.meta.env.VITE_OAUTH_HOST || "localhost"
export const OAUTH_PORT = import.meta.env.VITE_OAUTH_PORT || 3000

export const OAUTH_URI = `http://${OAUTH_HOST}:${OAUTH_PORT}/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read&state=xyz`

