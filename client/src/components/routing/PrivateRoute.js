import Reactfrom 'react'
import { Route, Redirect } from 'react-router-dom'
// import AuthContext from '../../context/auth/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authContext = useContext(AuthContext)
  // const { isAuthenticated, loading } = authContext
  const isAuth = true
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
