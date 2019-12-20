import axios from 'axios'

const env =
  process.env.VUE_APP_DEVELOP_ENV === 'true' ? 'development' : 'production'

export const domainConfig = {
  development: {
    // domain: 'http://testapi.ibreader.com/',
    domain: 'http://localhost:8081',
  },
  production: {
    domain: 'http://api.ibreader.com/',
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
