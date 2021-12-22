import React from 'react'

const BlogForm = ({
  handleAddBlog,
  newTitle,
  setTitle,
  newAuthor,
  setAuthor,
  newUrl,
  setUrl
}) => {
  return <>
    <h2>Blog form</h2>
    <form onSubmit={handleAddBlog}>
      <br />title: <input
        value={newTitle}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />author: <input
        value={newAuthor}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />url: <input
        value={newUrl}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br /><button type="submit">save</button>
    </form>
  </>
}

export default BlogForm