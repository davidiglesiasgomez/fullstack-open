import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const orderByLikes = (blogA, blogB) => {
    if (blogA.likes > blogB.likes) return -1
    if (blogA.likes < blogB.likes) return 1
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs.sort(orderByLikes) ))
  }, [])

  useEffect(() => {
    const loggedBlogListAppUser = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedBlogListAppUser) {
      const loggedUser = JSON.parse(loggedBlogListAppUser)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleMessage = (message, type) => {
    setErrorMessage({ message: message, type: type })
    setTimeout(() => {
      setErrorMessage({})
    }, 5000)
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
      const blog = await blogService.create(newBlogObj)

      handleMessage(`a new blog '${blog.title}' by '${blog.author}' added`, 'success')
      setBlogs( blogs.concat(blog) )
      blogFormRef.current.toggleVisibility()

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

    }

  }

  const handleLikeBlog = async (blogObj) => {

    try {
      const likedBlog = await blogService.addLike(blogObj)

      handleMessage(`the blog '${blogObj.title}' by '${blogObj.author}' was liked`, 'success')
      setBlogs( blogs.map(blog =>
        blog.id === blogObj.id
        ? likedBlog
        : blog
      ).sort(orderByLikes) )
      return likedBlog

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

    }

  }

  const handleRemoveBlog = async (blogObj) => {

    try {
      await blogService.remove(blogObj)

      handleMessage(`the blog '${blogObj.title}' by '${blogObj.author}' was deleted`, 'success')
      setBlogs( blogs.filter(blog => { return blog.id !== blogObj.id } ) )

    } catch (exception) {

      handleMessage(exception.response.data.error, 'error')

    }

  }

  return (
    <div>

      <h1>Blogs</h1>

      <Notification message={errorMessage} />

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
        <Blog key={blog.id} blog={blog} user={user} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} />
      )}
    </div>
  )
}

export default App