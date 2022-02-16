import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from '../components/CommentForm'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
      <h2>Blog</h2>

      <Card>
        <Card.Header><strong>{blog.title}</strong> by {blog.author}</Card.Header>
        <Card.Body>
          <a className='url' href={blog.url} target='_blank' rel='noreferrer'>{blog.url}</a>
          <br /><span className='likes'>{blog.likes} likes</span>
          <br /><Button variant="primary" size="sm" className='likeBlogButton' onClick={() => handleLikeBlog(blog)}>like</Button>
          { blog.comments.length>0 &&
            <>
              <hr />
              <p>Comments:</p>
              <ul>
                {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
              </ul>
            </>
          }
          <CommentForm blog={blog} />
        </Card.Body>
        <Card.Footer>
          Added by {blog.user.name}
          { loggedUser && loggedUser.id === blog.user.id &&
            <>
              &nbsp;<Button variant="primary" size="sm" className='deleteBlogButton' onClick={() => handleRemoveBlog(blog)}>remove</Button>
            </>
          }
        </Card.Footer>
      </Card>
    </>
  )
}

export default BlogView