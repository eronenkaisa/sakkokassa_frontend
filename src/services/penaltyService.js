import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/penalties'

const getAllPenalties = () => {
  return axios.get(baseUrl)
}

const createPenalty = newObject => {
  return axios.post(baseUrl, newObject)
}



/* 

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
} 

const deletePerson = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`)
} */

export default { getAllPenalties, createPenalty }