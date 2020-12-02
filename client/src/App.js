import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from 'config'

const App = () => {
  const [data, setMessage] = useState({
    message: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    console.log(`${config.apiUrl}/api`)

    axios({
      method: 'GET',
      url: `${config.apiUrl}/api`
    })
      .then((response) => {
        console.log(`RESPONSE: ${response.data.message}`)
        setMessage({
          message: response.data.message
        })
      })
      .catch((error) => {
        console.log(`ERROR: ${response}`)
      })
  }

  const { message } = data
  return (
    <div>
      <h1>{`${message}`}</h1>
    </div>
  )
}

export default App
