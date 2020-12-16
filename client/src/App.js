import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Signin from './pages/auth/Signin'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signin" component={Signin}></Route>
      </Switch>
    </Router>
  )
}

export default App
