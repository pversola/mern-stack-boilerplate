import axios from 'axios'
import config from 'config'

const getLists = () => {
  return axios({
    method: 'GET',
    url: `${config.apiUrl}/api/v1/users`
  }).then(handleResponse)
}

const handleResponse = (response) => {
  const { data } = response

  if (response.status !== 200) {
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  return data
}

const signIn = (data) => {
  const { email, password } = data
  return axios.post(`${config.apiUrl}/api/v1/signin`, data).then(handleResponse)
}

const signup = (data) => {
  return axios.post(`${config.apiUrl}/api/v1/signup`, data).then(handleResponse)
}

export const userService = {
  getLists,
  signIn
}
