import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import config from 'config'

import { userAction, authAction } from '../actions'

// const $ = require('jquery');
// $.DataTable = require('datatables.net');

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    //dispatch(userAction.getLists())
    dispatch(
      authAction.signin({
        email: 'pversola@gmail.com',
        password: 'mflv[1234'
      })
    )
  }, [])

  return (
    <div>
      {/* {users && users.isLoading && (
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      )}
      {users.items &&
        users.items.map((item, index) => (
          <div key={item._id}>{item.email}</div>
        ))} */}
    </div>
  )
}

export default UserList
