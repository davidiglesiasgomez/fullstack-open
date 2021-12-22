import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />

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
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Notification message={errorMessage} />

      <form onSubmit={handleAddBlog}>
        <br />title: <input
          value={newTitle}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />author: <input
          value={newAuthor}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />url: <input
          value={newUrl}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br /><button type="submit">save</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App