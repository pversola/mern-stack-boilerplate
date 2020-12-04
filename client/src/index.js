import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client'

import { store } from './redux/store'
import App from './App'
import config from 'config'

import './index.scss'

const client = new ApolloClient({
  uri: `${config.apiUrl}/graphql`,
  cache: new InMemoryCache()
})

// client
//   .query({
//     query: gql`
//       query {
//         users {
//           _id
//           name
//           email
//           role
//         }
//       }
//     `
//   })
//   .then((result) => console.log(result))

render(
  <ApolloProvider client={client} store={store}>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </ApolloProvider>,
  document.getElementById('root')
)
