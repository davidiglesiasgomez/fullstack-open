const notificationReducer = (state = '', action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@notification/new') {
    return action.data.notification
  }

  return state
}

export const notify = (notification, seconds) => {
  return dispatch => {
    dispatch({ type: '@notification/new', data: { notification } })
    setTimeout(() => dispatch({ type: '@notification/new', data: { notification: '' } }), seconds * 1000)
  }
}

export default notificationReducer