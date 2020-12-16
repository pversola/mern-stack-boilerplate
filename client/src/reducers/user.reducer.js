import { userConstant } from '../constants'

export const user = (state = {}, action) => {
  switch (action.type) {
    case userConstant.DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case userConstant.DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload
      }
    case userConstant.DATA_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
