import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from '../components/CommentForm'

const BlogView = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const handleLikeBlog = ( blogObj ) => {
    dispatch(likeBlog(blogObj))
  }

  const handleRemoveBlog = ( blogObj ) => {
    if (!window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
      return
    }
    dispatch(deleteBlog(blogObj))
  }

  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title} by {blog.author}</h2>
      <span className='url'>{blog.url}</span>
      <br /><span className='likes'>{blog.likes} likes</span> <button className='likeBlogButton' onClick={() => handleLikeBlog(blog)}>like</button>
      <br />Added by {blog.user.name}
      { loggedUser && loggedUser.id === blog.user.id &&
        <>
          <br />
          <button className='deleteBlogButton' onClick={() => handleRemoveBlog(blog)}>remove</button>
        </>
      }
      <CommentForm blog={blog} />
      { blog.comments.length>0 &&
        <>
          <h3>comments</h3>
          <ul>
            {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
          </ul>
        </>
      }
    </>
  )
}

export default BlogView