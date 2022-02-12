import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs
    .sort((blogA, blogB) => blogA.likes<blogB.likes)
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog => <li key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}><strong>{blog.title}</strong> by {blog.author}</Link></li>)}
    </>
  )
}

export default LoginInfo