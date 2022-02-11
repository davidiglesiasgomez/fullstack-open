import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'

const loggedBlogListAppUser = window.localStorage.getItem('loggedBlogListAppUser')
const loggedUser = JSON.parse(loggedBlogListAppUser)
const initialState = loggedUser
blogService.setToken( loggedUser ? loggedUser.token : null )

const authReducer = (state = initialState, action) => {

  if (action.type === '@auth/login') {
    return action.data
  }

  if (action.type === '@auth/logout') {
    return null
  }

  return state
}

export const userLogin = ( username, password ) => {
  return async dispatch => {

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogListAppUser',
        JSON.stringify( loggedUser ? loggedUser : null )
      )
      blogService.setToken( loggedUser ? loggedUser.token : null )
      dispatch({
        type: '@auth/login',
        data: loggedUser,
      })
      dispatch(notify(`Logged as ${loggedUser.name}`, 'success', 5))
    } catch (exception) {
      dispatch({
        type: '@auth/login',
        data: null,
      })
      blogService.setToken(null)
      dispatch(notify('Wrong credentials', 'error', 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.setItem(
      'loggedBlogListAppUser',
      JSON.stringify(null)
    )
    blogService.setToken(null)
    dispatch({
      type: '@auth/logout'
    })
    dispatch(notify('Logout', 'success', 5))
  }
}

export default authReducer