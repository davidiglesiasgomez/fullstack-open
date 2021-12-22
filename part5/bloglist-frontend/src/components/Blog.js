import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong> <button onClick={toggleVisible}>{ visible ? 'hide' : 'show' }</button>
      { visible &&
      <>
        <br />{blog.url}
        <br />{blog.likes} <button>like</button>
        <br />{blog.author}
      </>
      }
    </div>
  )
}

export default Blog