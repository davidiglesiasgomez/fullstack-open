const notificationReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@notification/new') {
    return state.concat(action.data)
  }

  if (action.type === '@notification/delete') {
    const newState = state.filter(notification => ( notification.id !== action.data.id ? true : false ))
    return newState
  }

  return state
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const notify = (notification, seconds) => {
  const notification_id = generateId()
  return dispatch => {
    dispatch({ type: '@notification/new', data: {
      id: notification_id,
      text: notification
    } })
    setTimeout(() => dispatch({ type: '@notification/delete', data: {
      id: notification_id
    } }), seconds * 1000)
  }
}

export default notificationReducer