import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedBlogListAppUser = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedBlogListAppUser) {
      const user = JSON.parse(loggedBlogListAppUser)
      setUser(user)
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

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const blog = await blogService.create(newBlogObj)

      handleMessage(`a new blog '${blog.title}' by '${blog.author}' added`, 'success')
      setBlogs( blogs.concat(blog) )
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      // console.log({exception})
      handleMessage(exception.response.data.error, 'error')
    }

  }

  return (
    <div>

      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null && <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />}
      {user !== null && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {user !== null && <BlogForm
        handleAddBlog={handleAddBlog}
        newTitle={newTitle}
        setTitle={setTitle}
        newAuthor={newAuthor}
        setAuthor={setAuthor}
        newUrl={newUrl}
        setUrl={setUrl}
      />}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App