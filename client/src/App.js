import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from 'config'

import { userAction } from './actions'

import UserList from './components/UserList'
// const App = () => {
//   const dispatch = useDispatch()
//   const users = useSelector((state) => state.users)

//   useEffect(() => {
//     dispatch(userAction.getLists())
//   }, [])

//   return (
//     <div className="container">
//       {users.items &&
//         users.items.map((item, index) => (
//           <div key={item._id}>{item.email}</div>
//         ))}
//     </div>
//   )
// }

const App = () => {
  return (
    <div className="container">
      <UserList />
    </div>
  )
}

export default App
