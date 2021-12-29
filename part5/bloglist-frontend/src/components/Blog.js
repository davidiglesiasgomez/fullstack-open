import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  handleLikeBlog,
  handleRemoveBlog
}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <strong>{blog.title}</strong> by {blog.author} <button onClick={toggleVisible}>{ visible ? 'hide' : 'show' }</button>
      { visible &&
      <>
        <br /><span className='url'>{blog.url}</span>
        <br /><span className='likes'>likes: {blog.likes}</span> <button onClick={() => handleLikeBlog(blog)}>like</button>
        <br />{blog.user.name}
        { user.username === blog.user.username &&
          <>
            <br />
            <button onClick={() => handleRemoveBlog(blog)}>remove</button>
          </>
        }
      </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog