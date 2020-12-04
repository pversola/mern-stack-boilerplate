import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import { useQuery, gql } from '@apollo/client'

const UserList = () => {
  const { loading, error, data } = useQuery(QUERY)

  // if (loading) return `Loading...`
  // if (error) return `Error ${error.message}`

  return (
    <div>
      {loading && (
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      )}
      {!loading &&
        data.users.map((item, index) => <div key={item._id}>{item.email}</div>)}
    </div>
  )
}

const QUERY = gql`
  query {
    users {
      _id
      name
      email
      role
    }
  }
`

export default UserList
