import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/penaltyTypes`

const getAllPenaltyTypes = () => {
  return axios.get(baseUrl)
}

/* 

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
} 
 */

export default { getAllPenaltyTypes }