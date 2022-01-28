const notificationReducer = (state = '', action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@notification/new') {
    return action.data.notification
  }

  return state
}

export const notify = (notification) => {
  return {
    type: '@notification/new',
    data: { notification }
  }
}

export default notificationReducer