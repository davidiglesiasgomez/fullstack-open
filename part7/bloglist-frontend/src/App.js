import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  const loggedUser = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

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