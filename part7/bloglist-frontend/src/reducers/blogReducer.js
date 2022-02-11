import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'

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
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: '@blog/new',
        data: newBlog,
      })
      dispatch(notify(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 'success', 5))
    } catch (exception) {
      dispatch(notify(exception.response.data.error, 'error', 5))
    }
  }
}

export const deleteBlog = blogObj => {
  return async dispatch => {
    try {
      await blogService.remove(blogObj)
      dispatch({
        type: '@blog/delete',
        data: { id: blogObj.id },
      })
      dispatch(notify(`the blog '${blogObj.title}' by '${blogObj.author}' was deleted`, 'success', 5))
    } catch (exception) {
      dispatch(notify(exception.response.data.error, 'error', 5))
    }
  }
}

export const likeBlog = blogObj => {
  return async dispatch => {
    try {
      const blogLiked = await blogService.addLike(blogObj)
      dispatch({
        type: '@blog/like',
        data: blogLiked,
      })
      dispatch(notify(`The blog '${blogLiked.title}' by '${blogLiked.author}' was liked`, 'success', 5))
    } catch (exception) {
      dispatch(notify(exception.response.data.error, 'error', 5))
    }
  }
}

export default blogReducer