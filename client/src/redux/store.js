import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

const middlewares = []

middlewares.push(thunkMiddleware)

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store)

export default { store, persistor }
