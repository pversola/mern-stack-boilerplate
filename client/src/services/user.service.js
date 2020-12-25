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
    const error =
      (data && data.message) || (data && data.error) || response.statusText

    return Promise.reject(error)
  }

  return data
}

const signIn = (data) => {
  const { email, password } = data
  return axios
    .post(`${config.apiUrl}/api/v1/signin`, data)
    .then(handleResponse)
    .catch((error) => handleResponse(error.response))
}

const signUp = (data) => {
  return axios
    .post(`${config.apiUrl}/api/v1/signup`, data)
    .then(handleResponse)
    .catch((error) => handleResponse(error.response))
}

const activation = (data) => {
  return axios
    .post(`${config.apiUrl}/api/v1/account-activation`, data)
    .then(handleResponse)
    .catch((error) => handleResponse(error.response))
}

const forgotPassword = (data) => {
  return axios
    .put(`${config.apiUrl}/api/v1/forgot-password`, data)
    .then(handleResponse)
    .catch((error) => handleResponse(error.response))
}

const resetPassword = (data) => {
  return axios
    .put(`${config.apiUrl}/api/v1/reset-password`, data)
    .then(handleResponse)
    .catch((error) => handleResponse(error.response))
}

export const userService = {
  getLists,
  signIn,
  signUp,
  activation,
  forgotPassword,
  resetPassword
}
