import React from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  return (
    <BrowserRouter>
      <h1>Blogs</h1>
      <Notification />
      <LoginForm />
      <LoginInfo />
      <Switch>
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