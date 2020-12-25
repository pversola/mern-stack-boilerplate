import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authAction } from '../actions/auth.action'

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!token) {
      history.push('/signin')
    }
  }, [token])

  const signoutForm = () => <button onClick={clickHandle}>Signout</button>
  const clickHandle = (e) => {
    dispatch(authAction.signOut())
  }

  return (
    <div className="container">
      <h1>Hello {user.name}</h1>
      {signoutForm()}
    </div>
  )
}

export default Home
