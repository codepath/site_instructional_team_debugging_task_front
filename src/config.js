const apiConfig = {
  remoteHostUrl: process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001",
}

const uiConfig = {
  alertDismissMs: 7.5 * 1000, // 7.5 seconds
}

const config = {
  ...apiConfig,
  ...uiConfig,
}

export default config
