import React from 'react'
import {useSelector} from 'react-redux'

export bearerToken = () => {
  const {token, user} = useSelector((state) => state.auth)

  if(token){
    return {'Authorization': 'Bearer ' + token}
  } else {
    return {}
  }
}