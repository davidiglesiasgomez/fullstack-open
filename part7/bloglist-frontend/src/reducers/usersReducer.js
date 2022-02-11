import userService from '../services/users'

const usersReducer = (state = [], action) => {

  if (action.type === '@users/init') {
    return action.data
  }

  return state
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: '@users/init',
      data: users,
    })
  }
}

export default usersReducer