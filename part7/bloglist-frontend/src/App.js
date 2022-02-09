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
import { initializeBlogs, createBlog } from './reducers/blogReducer'

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

  const handleMessage = (message, type) => {
    dispatch(notify(message, type, 5))
  }

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
      handleMessage('Wrong credentials', 'error')
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
      handleMessage(`a new blog '${newBlogObj.title}' by '${newBlogObj.author}' added`, 'success')
      blogs.concat(newBlogObj)
      blogFormRef.current.toggleVisibility()

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

    }

  }

  const handleLikeBlog = async (blogObj) => {
    console.log({blogObj})
    try {
      const likedBlog = await blogService.addLike(blogObj)
      console.log({likedBlog})

      handleMessage(`the blog '${blogObj.title}' by '${blogObj.author}' was liked`, 'success')
      // setBlogs( blogs.map(blog =>
      //   blog.id === blogObj.id
      //     ? likedBlog
      //     : blog
      // ).sort(orderByLikes) )

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

    }

  }

  const handleRemoveBlog = async (blogObj) => {

    if (!window.confirm(`Remove blog ${blogObj.title} by ${blogObj.author}`)) {
      return
    }

    try {
      await blogService.remove(blogObj)

      handleMessage(`the blog '${blogObj.title}' by '${blogObj.author}' was deleted`, 'success')
      // setBlogs( blogs.filter(blog => { return blog.id !== blogObj.id } ) )

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

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