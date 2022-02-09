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

  if (action.type === '@blog/delete') {
    const blogs = state.filter(blog => blog.id !== action.data.id)
    return blogs
  }

  if (action.type === '@blog/like') {
    return state.map(blog =>
      blog.id === action.data.id ? action.data : blog
    )
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

export const deleteBlog = blogObj => {
  return async dispatch => {
    await blogService.remove(blogObj)
    dispatch({
      type: '@blog/delete',
      data: { id: blogObj.id },
    })
  }
}

export const likeBlog = blogObj => {
  return async dispatch => {
    const blogLiked = await blogService.addLike(blogObj)
    dispatch({
      type: '@blog/like',
      data: blogLiked,
    })
  }
}

export default blogReducer