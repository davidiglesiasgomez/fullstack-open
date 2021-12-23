import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [thisBlog, setThisBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = (event) => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()

    blog = await blogService.addLike(thisBlog)
    setThisBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <strong>{thisBlog.title}</strong> <button onClick={toggleVisible}>{ visible ? 'hide' : 'show' }</button>
      { visible &&
      <>
        <br />{thisBlog.url}
        <br />{thisBlog.likes} <button onClick={handleLike}>like</button>
        <br />{thisBlog.author}
      </>
      }
    </div>
  )
}

export default Blog