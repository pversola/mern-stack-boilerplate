import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authAction, alertAction } from '../../actions'
import { alertConstant } from '../../constants'

const Signup = () => {
  const [values, setValues] = useState({
    name: 'pversola',
    email: 'patrickb.v@chanwanich.com',
    password: 'mflv[1234',
    passwordConfirm: 'mflv[1234'
  })
  const [objects, setObjects] = useState({
    headerText: 'Create Account',
    buttonText: 'Create Account',
    submitted: false
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const history = useHistory()
  const dispatch = useDispatch()
  const { verifyEmail, isError, errorMsg } = useSelector((state) => state.auth)
  const { type, message } = useSelector((state) => state.alert)

  const { name, email, password, passwordConfirm } = values

  const { headerText, buttonText, submitted } = objects

  useEffect(() => {
    console.log(errorMsg)
    dispatch(alertAction.clear())
    dispatch(authAction.clearError())
  }, [])

  useEffect(() => {
    setObjects({ ...objects, buttonText: 'Create Account', submitted: false })

    if (verifyEmail) {
      dispatch(alertAction.clear())
      dispatch(authAction.clearError())
    }
  }, [verifyEmail])

  useEffect(() => {
    setObjects({ ...objects, buttonText: 'Create Account', submitted: false })
    console.log(errorMsg)
    if (errorMsg) {
      dispatch(alertAction.error(errorMsg))
    }
  }, [errorMsg])

  const validate = {
    name: (name) => {
      if (name.trim() === '') {
        return 'Name is required'
      }

      return null
    },
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
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
        return null
      }

      if (password.trim() === '') {
        return 'Password is required'
      }

      if (!/(?=.*?[A-Z])/.test(password)) {
        return 'Password must be at least one upper case'
      }

      if (!/(?=.*?[a-z])/.test(password)) {
        return 'Password must be at least one lower case'
      }

      if (!/(?=.*?[0-9])/.test(password)) {
        return 'Password must be at least one digit'
      }

      if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
        return 'Password must be at least one special character'
      }

      if (!/.{8,}/.test(password)) {
        return 'Password must be at least 8 characters long'
      }

      return null
    },
    passwordConfirm: (passwordConfirm) => {
      if (passwordConfirm.trim() === '') {
        return 'Password Confirm is required'
      }

      if (password !== passwordConfirm) {
        return 'Password do not match.'
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
      setObjects({ ...objects, buttonText: 'Creating...', submitted: true })

      // dispatch(alertAction.clear())
      dispatch(authAction.signUp({ name, email, password }))
    }
  }

  const signupForm = () => (
    <form>
      {type && message && (
        <div className={type} role="alert">
          {message}
        </div>
      )}
      <div className="form-group">
        <label className="small mb-1">Name</label>
        <input
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={name}
          type="text"
          className={
            touched.name && errors.name
              ? 'form-control border-red'
              : 'form-control'
          }
          placeholder="Name"
          required
        />
        {touched.name && errors.name && (
          <span className="text-xs text-red">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label className="small mb-1">Email</label>
        <input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={email}
          type="text"
          className={
            touched.email && errors.email
              ? 'form-control border-red'
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
              ? 'form-control border-red'
              : 'form-control'
          }
          placeholder="Password"
          required
        />
        {touched.password && errors.password && (
          <span className="text-xs text-red">{errors.password}</span>
        )}
      </div>
      <div className="form-group">
        <label className="small mb-1">Password Confirm</label>
        <input
          name="passwordConfirm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={passwordConfirm}
          type="password"
          className={
            touched.passwordConfirm && errors.passwordConfirm
              ? 'form-control border-red'
              : 'form-control'
          }
          placeholder="Password Confirm"
          required
        />
        {touched.passwordConfirm && errors.passwordConfirm && (
          <span className="text-xs text-red">{errors.passwordConfirm}</span>
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

  const verifyEmailForm = () => (
    <div className="small mb-3 text-muted">Hey {name}, Thank you</div>
  )

  return (
    <div className="layoutAuthentication">
      <div className="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg my-5">
                  <div className="card-header justify-content-center">
                    <h3 className="font-weight-light my-4">{headerText}</h3>
                  </div>
                  <div className="card-body">
                    {submitted && verifyEmail
                      ? verifyEmailForm()
                      : signupForm()}
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      Have an account? <Link to="/signin">Go to signin</Link>
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

export default Signup
