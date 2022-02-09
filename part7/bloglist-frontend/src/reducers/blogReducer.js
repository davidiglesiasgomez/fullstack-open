import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@blog/init') {
    return action.data
  }

  if (action.type === '@blog/new') {
    return state.concat(action.data)
  }

  return state
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: '@blog/init',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newblog = await blogService.create(content)
    dispatch({
      type: '@blog/new',
      data: newblog,
    })
  }
}

export default blogReducer