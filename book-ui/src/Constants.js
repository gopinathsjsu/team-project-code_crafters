const prod = {
  url: {
    API_BASE_URL: 'http://35.173.129.51:8080',
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://35.173.129.51:8080'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
