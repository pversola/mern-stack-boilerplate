import { alertConstant } from '../constants'

export const alertAction = {
  success,
  error,
  clear
}

function success(message) {
  return {
    type: alertConstant.SUCCESS,
    message
  }
}

function error(message) {
  return {
    type: alertConstant.FAILURE,
    message
  }
}

function clear() {
  return {
    type: alertConstant.CLEAR,
    message: ''
  }
}
