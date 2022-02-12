import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/authReducer'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  if (user === null) return <></>

  return (
    <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
  )
}

export default LoginInfo