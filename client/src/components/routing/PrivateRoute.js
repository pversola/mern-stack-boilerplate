import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
// import AuthContext from '../../context/auth/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authContext = useContext(AuthContext)
  // const { isAuthenticated, loading } = authContext
  const { token, user } = useSelector((state) => state.auth)

  const isAuth = token && user

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/signin" /> : <Component {...props} />
      }
    />
  )
}

export default PrivateRoute
