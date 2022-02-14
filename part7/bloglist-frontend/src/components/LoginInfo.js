import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/authReducer'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }

  const padding = {
    padding: 5
  }

  if (loggedUser === null) return (
    <Link style={padding} to="/login">login</Link>
  )

  return (
    <span>{loggedUser.name} logged in <button onClick={handleLogout}>logout</button></span>
  )
}

export default LoginInfo