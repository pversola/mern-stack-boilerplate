import { useEffect } from 'react'
import { userConstant } from '../constants'

const users = (state = {}, action) => {
  switch (action.type) {
    case userConstant.DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case userConstant.DATA_SUCCESS:
      console.log(action.payload)
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

export default users
