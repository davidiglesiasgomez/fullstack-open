import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs
    .sort((blogA, blogB) => blogA.likes<blogB.likes)
  )

  return (
    <>
      <h2>Blogs List</h2>
      <Table>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link className="text-dark" to={`/blogs/${blog.id}`}><strong>{blog.title}</strong> by {blog.author}</Link></td>
            </tr>
          )}
        </tbody>
      </Table>

    </>
  )
}

export default BlogList
