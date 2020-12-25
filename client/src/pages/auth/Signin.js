import React, { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  faGoogle,
  faFacebookF,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { authAction, alertAction } from '../../actions'
import { alertConstant } from '../../constants'
const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [objects, setObjects] = useState({
    buttonText: 'Sign in',
    submitted: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const history = useHistory()
  const dispatch = useDispatch()
  const { token, user, signin, isError, errorMsg } = useSelector(
    (state) => state.auth
  )
  const { type, message } = useSelector((state) => state.alert)

  useEffect(() => {
    console.log(errorMsg)
    dispatch(alertAction.clear())
    dispatch(authAction.clearError())
  }, [])

  useEffect(() => {
    if (token && user) {
      history.push('/')
    }
  }, [token])

  useEffect(() => {
    setObjects({ ...objects, buttonText: 'Sign in', submitted: false })

    if (signin.error) {
      dispatch(alertAction.error(signin.error))
    }
  }, [signin.error])

  const { email, password } = values
  const { buttonText, submitted } = objects

  const validate = {
    email: (email) => {
      if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return null
      }

      if (email.trim() === '') {
        return 'Email is required'
      }

      return 'Please enter a valid email'
    },
    password: (password) => {
      if (password.trim() === '') {
        return 'Password is required'
      }

      return null
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
    setTouched({ ...touched, [name]: true })
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const { [name]: removedError, ...rest } = errors
    const error = validate[name](value)

    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    })
  }

  const informParent = (response) => {
    history.push('/')
  }

  const clickSubmit = (e) => {
    e.preventDefault()

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key])
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        }
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    )

    setErrors(formValidation.errors)
    setTouched(formValidation.touched)

    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
        Object.values(values).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      dispatch(authAction.signIn({ email, password }))
      setObjects({ ...status, submitted: true })
    }
  }

  const signinForm = () => (
    <form>
      {type && message && (
        <div className={type} role="alert">
          {message}
        </div>
      )}
      <div className="form-group">
        <label className="small mb-1">Email</label>
        <input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={email}
          type="email"
          className={
            touched.email && errors.email
              ? 'form-control border-danger'
              : 'form-control'
          }
          placeholder="Email"
          required
        />
        {touched.email && errors.email && (
          <span className="text-xs text-red">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label className="small mb-1">Password</label>
        <input
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={password}
          type="password"
          className={
            touched.password && errors.password
              ? 'form-control border-danger'
              : 'form-control'
          }
          placeholder="Password"
          required
        />
        {touched.password && errors.password && (
          <span className="text-xs text-red">{errors.password}</span>
        )}
      </div>

      <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
        <button
          className="btn btn-primary btn-user btn-block"
          onClick={clickSubmit}
          disabled={submitted}>
          {buttonText}
        </button>
      </div>
    </form>
  )

  return (
    <div className="layoutAuthentication">
      <div className="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="card shadow-lg border-0 rounded-lg my-5">
                  <div className="card-header justify-content-center">
                    <h3 className="font-weight-light my-4">Sign in</h3>
                  </div>
                  <div className="card-body">{signinForm()}</div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="small">
                      <Link to="/signup">Create an Account!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Signin
