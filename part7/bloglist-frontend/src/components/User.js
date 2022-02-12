import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

export default UserList