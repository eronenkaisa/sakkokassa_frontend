import { useEffect, useState } from 'react'
import penaltyService from './services/penaltyService'
import personService from './services/personService'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [penalties, setPenalties] = useState([])

  useEffect(() => {
    personService
    .getAllPersons()
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

  useEffect(() => {
    penaltyService
    .getAllPenalties()
    .then(response =>  {
      console.log(response.data)
      setPenalties(response.data)
    })
  }, [])

  return (
  <div>
    <h1>
      Persons
    </h1>
    <ul>
      {persons.map((person) => <li>{person.name}<br></br>
      {penalties
        .filter((penalty) => penalty.personId === person.id)
        .map((penalty) => <span>{penalty.reason}: {penalty.sum/100} €</span>)}</li>)}
      {/*Penalties: {penalties.map((penalty) => penalty.comment)}*/}
    </ul>

    <p>Hello world</p>
  </div>
  )
}

export default App