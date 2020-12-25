import { alertConstant } from '../constants'

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstant.SUCCESS:
      return {
        type: 'alert alert-success',
        message: action.message
      }
    case alertConstant.FAILURE:
      return {
        type: 'alert alert-danger',
        message: action.message
      }
    case alertConstant.CLEAR:
      return {}
    default:
      return state
  }
}
