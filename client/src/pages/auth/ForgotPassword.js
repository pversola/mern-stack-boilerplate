import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { authAction } from '../../actions'

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: 'pversola@gmail.com',
    buttonText: 'Send email',
    submitted: false
  })
  const dispatch = useDispatch()

  const { email, buttonText, submitted } = values

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
  }
  const forgotForm = () => (
    <form>
      <div className="small mb-3 text-muted">
        Enter your email address and will send you a link to reset your password
      </div>
      <div className="form-group">
        <label className="small mb-1" htmlFor="inputEmailAddress">
          Email
        </label>
        <input
          name="email"
          onChange={handleChange}
          value={email}
          type="email"
          className="form-control"
          id="inputEmailAddress"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
        <button
          className="btn btn-primary btn-user btn-block"
          onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  )

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header justify-content-center">
                    <h3 className="font-weight-light my-4">Forgot Password</h3>
                  </div>
                  <div className="card-body">{forgotForm()}</div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <Link to="/signin">Back to signin</Link>
                    </div>
                    <div className="small">
                      <Link to="/signup">Create an account</Link>
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

export default ForgotPassword
