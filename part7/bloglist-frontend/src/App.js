import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <h1>React App</h1>
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
            <BlogList />
            <BlogForm />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App