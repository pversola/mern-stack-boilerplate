import { alertConstant } from '../constants'

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstant.SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload
      }
    case alertConstant.FAILURE:
      return {
        type: 'alert-danger',
        message: action.payload
      }
    case alertConstant.CLEAR:
      return {}
    default:
      return state
  }
}
