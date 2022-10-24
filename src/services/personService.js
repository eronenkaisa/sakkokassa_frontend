import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const createPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = (personId, newObject) => {
  return axios.delete(`${baseUrl}/${personId}`)
}

/* const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

*/

export default { getAllPersons, createPerson, deletePerson }