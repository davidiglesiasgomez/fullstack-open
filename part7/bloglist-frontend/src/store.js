import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: authReducer,
  users: usersReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store