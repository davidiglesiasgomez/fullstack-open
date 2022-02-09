import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleAddBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    handleAddBlog(newBlogObj)

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return <>
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
  </>
}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired
}

export default BlogForm