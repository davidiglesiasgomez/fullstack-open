import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <LoginInfo />
      </div>

      <h1>Blogs</h1>
      <Notification />
      <Switch>
        <Route path="/login">
          { loggedUser ? <Redirect to="/" /> : <LoginForm /> }
        </Route>
        <Route path="/blogs/:id">
          <BlogView />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App