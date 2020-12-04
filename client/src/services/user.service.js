import axios from 'axios'
import config from 'config'
import { useQuery, gql, useApolloClient } from '@apollo/client'

const query = gql`
  query {
    users {
      _id
      name
      email
      role
    }
  }
`

const getLists = () => {
  const client = useApolloClient()
  // const { data } = useQuery(query)
  // return axios({
  //   method: 'GET',
  //   url: `${config.apiUrl}/api/v1/users`
  // }).then(handleResponse)

  client.query(query).then(handleResponse)
}

const handleResponse = (response) => {
  const { data } = response

  if (response.status !== 200) {
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  return data
}

export const userService = {
  getLists
}
