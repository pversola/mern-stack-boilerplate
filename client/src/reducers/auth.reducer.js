import { authConstant } from '../constants'

export const auth = (state = {}, action) => {
  switch (action.type) {
    case authConstant.SIGNIN_REQUEST:
      return {
        ...state
      }
    case authConstant.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case authConstant.SIGNIN_FAILURE:
      return {}
    case authConstant.SIGNOUT:
      return {}
    default:
      return state
  }
}
