import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  if (loggedUser !== null) return <></>

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit"
          id="loginButton"
        >login</button>
      </form>
    </>
  )
}

export default LoginForm