import React from 'react'

const ResetPassword = () => {
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
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
          className="form-control"
          id="inputEmailAddress"
          type="email"
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

  return <div className="container">Reset Password</div>
}

export default ResetPassword
