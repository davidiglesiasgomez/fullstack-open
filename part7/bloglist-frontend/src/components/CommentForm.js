import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../reducers/blogReducer'

const BlogForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [newComment, setComment] = useState('')

  const addCommentHandle = (event) => {
    event.preventDefault()

    const newCommentObj = {
      comment: newComment,
      blogId: blog.id
    }

    dispatch(addComment(newCommentObj))

    setComment('')
  }

  return (
    <>
      <form onSubmit={addCommentHandle}>
        comment: <input
          id="comment"
          value={newComment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  blog: PropTypes.object
}

export default BlogForm