import axios from 'axios'

const env =
  process.env.VUE_APP_DEVELOP_ENV === 'true' ? 'development' : 'production'
const windowURL = window.location.origin
export const domainConfig = {
  development: {
    domain: windowURL,
  },
  production: {
    domain: windowURL,
  },
}

function getDomin(domin) {
  return domainConfig[env][domin]
}

const DOMAIN = {
  domain: getDomin('domain'),
}

export default DOMAIN

export const Api = {
  domain: axios.create({ baseURL: DOMAIN.domain }),
}
