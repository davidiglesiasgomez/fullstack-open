import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  handleLikeBlog,
  handleRemoveBlog
}) => {
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
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    blog = await handleLikeBlog(thisBlog)
    setThisBlog(blog)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (!window.confirm(`Remove blog ${thisBlog.title} by ${thisBlog.author}`)) {
      return
    }
    await handleRemoveBlog(thisBlog)
  }

  return (
    <div style={blogStyle}>
      <strong>{thisBlog.title}</strong> by {thisBlog.author} <button onClick={toggleVisible}>{ visible ? 'hide' : 'show' }</button>
      { visible &&
      <>
        <br />{thisBlog.url}
        <br />{thisBlog.likes} <button onClick={handleLike}>like</button>
        <br />{thisBlog.user.name}
        { user.username === thisBlog.user.username &&
          <>
            <br />
            <button onClick={handleRemove}>remove</button>
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