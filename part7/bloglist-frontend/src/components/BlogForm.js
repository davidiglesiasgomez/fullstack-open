import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from '../components/Togglable'
import { createBlog } from '../reducers/blogReducer'

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
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>Blog form</h2>
      <form onSubmit={addBlog}>
        <br />title: <input
          id="title"
          value={newTitle}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />author: <input
          id="author"
          value={newAuthor}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />url: <input
          id="url"
          value={newUrl}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br /><button type="submit"
          id="addBlogButton"
        >save</button>
      </form>
    </Togglable>
  )
}

export default BlogForm