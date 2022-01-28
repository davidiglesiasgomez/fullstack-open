const filterReducer = (state = '', action) => {
  switch (action.type) {
    case '@filter/set':
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: '@filter/set',
    filter,
  }
}

export default filterReducer