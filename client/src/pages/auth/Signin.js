import React, { useState, useEffect } from 'react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { authAction } from '../../actions'

const Signin = () => {
  const [values, setValues] = useState({
    email: 'pversola@gmail.com',
    password: 'mflv[1234',
    buttonText: 'Signin',
    submitted: false
  })
  const history = useHistory()
  const dispatch = useDispatch()

  const { token, user } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log(token)
    if (token) {
      history.push('/')
    }
  }, [token])

  const { email, password, buttonText, submitted } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const informParent = (response) => {
    history.push('/')
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, submitted: true })

    dispatch(authAction.signIn({ email, password }))
  }

  const signinForm = () => (
    <form>
      <div className="form-group">
        {/* <label className="text-muted">Email</label> */}
        <input
          onChange={handleChange('email')}
          value={email}
          type="text"
          className="form-control"
          placeholder="Email"
          required
        />
      </div>

      <div className="form-group">
        {/* <label className="text-muted">Password</label> */}
        <input
          onChange={handleChange('password')}
          value={password}
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div className="form-group">
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  )

  return (
    <div className="col-md-6 offset-md-3">
      <h1 className="pt-5 text-center">Signin</h1>
      <br />
      {signinForm()}
      <br />
      <Link
        to="/auth/password/forgot"
        className="btn btn-sm btn-outline-danger">
        Forgot Password
      </Link>
    </div>
  )
}

export default Signin
