/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = ( newObject, id ) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll, 
  create,
  remove,
  update
}