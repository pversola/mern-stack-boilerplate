import { useDispatch } from 'react-redux'
import { authConstant } from '../constants'
import { auth } from '../reducers/auth.reducer'
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
      (response) => dispatch(success(response)),
      (error) => dispatch(failure(error))
    )
  }
}

const signOut = () => {
  return (dispatch) => {
    dispatch({ type: authConstant.SIGNOUT })
  }
}

const signUp = (data) => {
  const request = () => {
    return { type: authConstant.SIGNUP_REQUEST }
  }
  const success = (response) => {
    return {
      type: authConstant.SIGNUP_SUCCESS,
      payload: response,
      email: data.email
    }
  }
  const failure = (error) => {
    return { type: authConstant.SIGNUP_FAILURE, payload: error }
  }

  return (dispatch) => {
    dispatch(request())

    userService.signUp(data).then(
      (response) => dispatch(success(response)),
      (error) => dispatch(failure(error))
    )
  }
}

const activation = (data) => {
  const request = () => {
    return { type: authConstant.ACTIVATION_ACCOUNT_REQUEST }
  }
  const success = () => {
    return { type: authConstant.ACTIVATION_ACCOUNT_REQUEST }
  }
  const failure = () => {
    return { type: authConstant.ACTIVATION_ACCOUNT_REQUEST }
  }

  return (dispatch) => {
    dispatch(request)

    userService.activation(data).then(
      (response) => dispatch(success(response)),
      (error) => dispatch(failure(error))
    )
  }
}

const forgotPassword = (data) => {
  const request = () => {
    return { type: authConstant.FORGOT_PASSWORD_REQUEST }
  }
  const success = (response) => {
    return { type: authConstant.FORGOT_PASSWORD_SUCCESS, payload: response }
  }
  const failure = (error) => {
    return { type: authConstant.FORGOT_PASSWORD_FAILURE, payload: error }
  }

  return (dispatch) => {
    dispatch(request)

    userService.forgotPassword(data).then(
      (response) => dispatch(success(response)),
      (error) => dispatch(failure(error))
    )
  }
}

const resetPassword = (data) => {
  const request = () => {
    return { type: authConstant.RESET_PASSWORD_REQUEST }
  }
  const success = (response) => {
    return { type: authConstant.RESET_PASSWORD_SUCCESS, payload: response }
  }
  const failure = (error) => {
    return { type: authConstant.RESET_PASSWORD_FAILURE, payload: error }
  }

  return (dispatch) => {
    dispatch(request)

    userService.resetPassword(data).then(
      (response) => dispatch(success(response)),
      (error) => dispatch(failure(error))
    )
  }
}

const clearError = () => {
  return (dispatch) => {
    dispatch({ type: authConstant.CLEAR_ERROR })
  }
}

export const authAction = {
  signIn,
  signOut,
  signUp,
  activation,
  forgotPassword,
  resetPassword,
  clearError
}
