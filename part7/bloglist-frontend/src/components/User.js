import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <h2>User</h2>
      <Card>
        <Card.Header>{user.name}</Card.Header>
        <Card.Body>
          <p>Added blogs by {user.name}:</p>
          <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </Card.Body>
      </Card>
    </>
  )
}

export default User