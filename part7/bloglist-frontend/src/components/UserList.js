import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  console.log({users})

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default UserList