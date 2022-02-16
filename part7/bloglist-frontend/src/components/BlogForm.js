import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from '../components/Togglable'
import { createBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const blogFormRef = useRef()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(createBlog(newBlogObj))
    blogFormRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  if (user === null) return <></>

  return (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <h2>Blog form</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter url"
            value={newUrl}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          id="addBlogButton"
          variant="primary"
        >
          save
        </Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm