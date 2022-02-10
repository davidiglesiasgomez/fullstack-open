import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs
    .sort((blogA, blogB) => blogA.likes<blogB.likes)
  )

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedBlogListAppUser = window.localStorage.getItem('loggedBlogListAppUser')
    if (!loggedBlogListAppUser || loggedBlogListAppUser === 'null') {
      return
    }
    const loggedUser = JSON.parse(loggedBlogListAppUser)
    setUser(loggedUser)
    blogService.setToken(loggedUser.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogListAppUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notify('Wrong credentials', 'error', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.setItem(
      'loggedBlogListAppUser',
      JSON.stringify(null)
    )

    blogService.setToken(null)

    setUser(null)
  }

  const handleAddBlog = async (newBlogObj) => {

    try {

      dispatch(createBlog(newBlogObj))
      dispatch(notify(`a new blog '${newBlogObj.title}' by '${newBlogObj.author}' added`, 'success', 5))
      blogFormRef.current.toggleVisibility()

    } catch (exception) {

      dispatch(notify(exception.response.data.error, 'error', 5))

    }

  }

  const handleLikeBlog = async (blogObj) => {
    console.log({blogObj})
    try {

      dispatch(likeBlog(blogObj))
      dispatch(notify(`the blog '${blogObj.title}' by '${blogObj.author}' was liked`, 'success', 5))

    } catch (exception) {

      dispatch(notify(exception.response.data.error, 'error', 5))

    }

  }

  const handleRemoveBlog = async (blogObj) => {

    if (!window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
      return
    }

    try {

      dispatch(deleteBlog(blogObj))
      dispatch(notify(`the blog '${blogObj.title}' by '${blogObj.author}' was deleted`, 'success', 5))

    } catch (exception) {

      dispatch(notify(exception.response.data.error, 'error', 5))

    }

  }

  return (
    <div>

      <h1>Blogs</h1>

      <Notification />

      {user === null &&
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      }
      {user !== null && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {user !== null &&
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          handleAddBlog={handleAddBlog}
        />
      </Togglable>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} userid={( user !== null ? user.id : '' )} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} />
      )}
    </div>
  )
}

export default App