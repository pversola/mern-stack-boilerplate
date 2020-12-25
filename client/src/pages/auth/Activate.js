import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwt from 'jsonwebtoken'

import { authAction } from '../../actions'

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    buttonText: 'Activate Account',
    submitted: false
  })

  const history = useHistory()
  const dispatch = useDispatch()
  const { activated } = useSelector((state) => state.auth)

  const { name, token, buttonText, submitted } = values

  useEffect(() => {
    let token = `${match.params.token1}.${match.params.token2}.${match.params.token3}`
    let { email, name } = jwt.decode(token)

    if (token) {
      setValues({ ...values, name, token })
    }
  }, [])

  useEffect(() => {
    if (submitted && activated) {
      history.push('/')
    }
  }, [activated])

  const clickSubmit = (e) => {
    event.preventDefault()

    setValues({ ...values, submitted: true })
    dispatch(authAction.activation({ token }))
  }

  const activationForm = () => (
    <form>
      <div className="small mb-3 text-muted">
        Hey {name}, Ready to activate your account?
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

  const thankyouForm = () => (
    <div className="small mb-3 text-muted">Hey {name}, Thank you</div>
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
                    <h3 className="font-weight-light my-4">Activate Account</h3>
                  </div>
                  <div className="card-body">
                    {submitted && activated ? thankyouForm() : activationForm()}
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

export default Activate
