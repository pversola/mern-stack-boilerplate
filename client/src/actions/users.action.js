import { useDispatch } from 'react-redux'
import { userConstant } from '../constants'
import { userService } from '../services'

const getLists = () => {
  const request = () => {
    return { type: userConstant.DATA_REQUEST }
  }
  const success = (users) => {
    return { type: userConstant.DATA_SUCCESS, payload: users }
  }
  const failure = (error) => {
    return { type: userConstant.DATA_FAILURE, payload: error }
  }

  return (dispatch) => {
    dispatch(request())

    userService.getLists().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    )
  }
}

export const userAction = {
  getLists
}
