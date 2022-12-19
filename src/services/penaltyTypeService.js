import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/penaltyTypes'

const getAllPenaltyTypes = () => {
  return axios.get(baseUrl)
}

/* 

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
} 
 */

export default { getAllPenaltyTypes }