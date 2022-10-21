import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

/* const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`)
} */

export default { getAllPersons }