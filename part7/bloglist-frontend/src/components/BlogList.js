import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, deleteBlog, likeBlog } from '../reducers/blogReducer'
import Blog from '../components/Blog'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs
    .sort((blogA, blogB) => blogA.likes<blogB.likes)
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLikeBlog = ( blogObj ) => {
    dispatch(likeBlog(blogObj))
  }

  const handleRemoveBlog = ( blogObj ) => {
    if (!window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
      return
    }
    dispatch(deleteBlog(blogObj))
  }

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} userid={( user !== null ? user.id : '' )} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} />
      )}
    </>
  )
}

export default LoginInfo