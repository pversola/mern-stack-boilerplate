import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { user } from './user.reducer'
import { auth } from './auth.reducer'
import { alert } from './alert.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}
const rootReducer = combineReducers({
  user,
  auth,
  alert
})

export default persistReducer(persistConfig, rootReducer)
