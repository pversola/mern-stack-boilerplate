import { useDispatch } from 'react-redux'
import { authConstant } from '../constants'
import { userService } from '../services'

const signIn = (data) => {
  const request = () => {
    return { type: authConstant.SIGNIN_REQUEST }
  }
  const success = (response) => {
    return { type: authConstant.SIGNIN_SUCCESS, payload: response }
  }
  const failure = (error) => {
    return { type: authConstant.SIGNIN_FAILURE, payload: error }
  }

  return (dispatch) => {
    dispatch(request())

    userService.signIn(data).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error))
    )
  }
}

export const authAction = {
  signIn
}
