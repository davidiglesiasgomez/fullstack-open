import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blog => {

  const patchObject = {
    op: 'replace',
    path: '/likes',
    value: blog.likes + 1
  }

  const response = await axios.patch(`${baseUrl}/${blog.id}`, patchObject)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const addComment = async commentObj => {

  const newComment = {
    comment: commentObj.comment
  }

  const response = await axios.post(`${baseUrl}/${commentObj.blogId}/comments`, newComment)
  return response.data
}

const services = {
  setToken,
  getAll,
  create,
  addLike,
  remove,
  addComment
}

export default services