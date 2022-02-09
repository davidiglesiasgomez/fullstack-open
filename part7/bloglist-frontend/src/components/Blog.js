import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  userid,
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
      <strong>{blog.title}</strong> by {blog.author} <button className='toggleBlogButton' onClick={toggleVisible}>{ visible ? 'hide' : 'show' }</button>
      { visible &&
      <>
        <br /><span className='url'>{blog.url}</span>
        <br /><span className='likes'>likes: {blog.likes}</span> <button className='likeBlogButton' onClick={() => handleLikeBlog(blog)}>like</button>
        <br />{blog.user.name}
        { userid === blog.user.id &&
          <>
            <br />
            <button className='deleteBlogButton' onClick={() => handleRemoveBlog(blog)}>remove</button>
          </>
        }
      </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userid: PropTypes.string.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog