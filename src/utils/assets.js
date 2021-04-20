import config from "config"

export const getStaticAssetsPath = (path) => {
  return `${config.remoteHostUrl}/static/${path}`
}
