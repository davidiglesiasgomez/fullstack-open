import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data.sort(function(a, b){
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      return 0
    })
  })
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

export default {
  setToken,
  getAll,
  create,
  addLike
}