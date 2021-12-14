import axios from 'axios'
const baseUrl = process.env.REACT_APP_SERVICES_PERSONS_BASE_URL

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (newObject, id) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
  getAll,
  create,
  remove,
  update
}
