import { authConstant } from '../constants'
import { setCookie, getCookie, removeCookie } from '../helpers/cookie'
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '../helpers/localStorage'

let token = getCookie('token')
let user = getLocalStorage('user')

const initialState = token && user ? { token, user } : {}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.SIGNIN_REQUEST:
      return {}
    case authConstant.SIGNIN_SUCCESS:
      setCookie('token', action.payload.token)
      setLocalStorage('user', action.payload.user)

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case authConstant.SIGNIN_FAILURE:
      return {
        isError: true,
        errorMsg: action.payload
      }
    case authConstant.SIGNOUT:
      removeCookie('token')
      removeLocalStorage('user')

      return {}
    case authConstant.SIGNUP_REQUEST:
      return {}
    case authConstant.SIGNUP_SUCCESS:
      return { ...state, verifyEmail: action.email }
    case authConstant.SIGNUP_FAILURE:
      return { isError: true, errorMsg: action.payload }
    case authConstant.ACTIVATION_ACCOUNT_REQUEST:
      return { activated: false }
    case authConstant.ACTIVATION_ACCOUNT_SUCCESS:
      return { ...state, activated: true }
    case authConstant.ACTIVATION_ACCOUNT_FAILURE:
      return { isError: true, errorMsg: action.payload }
    case authConstant.FORGOT_PASSWORD_REQUEST:
      return { forgoted: false }
    case authConstant.FORGOT_PASSWORD_SUCCESS:
      return { ...state, forgoted: true }
    case authConstant.FORGOT_PASSWORD_FAILURE:
      return { isError: true, errorMsg: action.payload }
    case authConstant.RESET_PASSWORD_REQUEST:
      return { reseted: false }
    case authConstant.RESET_PASSWORD_SUCCESS:
      return { ...state, reseted: true }
    case authConstant.RESET_PASSWORD_FAILURE:
      return { isError: true, errorMsg: action.payload }
    case authConstant.CLEAR_ERROR:
      return {}
    default:
      return state
  }
}
