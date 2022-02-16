import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
      <Form onSubmit={addCommentHandle}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="comment" visuallyHidden>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter comment"
              id="comment"
              value={newComment}
              onChange={({ target }) => setComment(target.value)}
              className="mb-2"
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" className="mb-2">add comment</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

BlogForm.propTypes = {
  blog: PropTypes.object
}

export default BlogForm