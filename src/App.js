import { useEffect, useState } from 'react'
import penaltyService from './services/penaltyService'
import personService from './services/personService'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import penaltyTypeService from './services/penaltyTypeService'
import AddPenalty from './components/AddPenalty'
import Person from './components/Person'


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [penalties, setPenalties] = useState([])
  const [penaltyTypes, setPenaltyTypes] = useState([])
  const [deleteType, setDeleteType] = useState('success')
  const [deleteMessage, setDeleteMessage] = useState([])
  const [updateMessage, setUpdateMessage] = useState([])
  
  
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
      .then(response => {
        console.log(response.data)
        setPenalties(response.data)
      })
  }, [])

  useEffect(() => {
    penaltyTypeService
      .getAllPenaltyTypes()
      .then(response => {
        setPenaltyTypes(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    personService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const deletePerson = (id, name) => {
    personService.deletePerson(id).then(response => {
      console.log("RESPONSE DATA.NAME")
      console.log(response.data)
      setDeleteType('success')
      setDeleteMessage(`Deleted ${name}`)
      setTimeout(() => {
        setDeleteMessage(null)
      }, 5000)
      const filteredPersons = persons.filter(person => person.id !== id)
      setPersons(filteredPersons)
      setNewName('')
    })
      .catch(error => {
        setDeleteType('error')
        setDeleteMessage(`Failed to delete ${name}`)
        setTimeout(() => {
          setUpdateMessage(null)
        }, 5000)
      })
  }



  return (
    <div>
      <h1>
        Sakkokassa
      </h1>
      <ul>
        {persons.map((person) => (
          <li>
            <Person key={person.name} person={person} penalties={penalties
              .filter((penalty) => penalty.personId === person.id)} penaltyTypes={penaltyTypes} deletePerson={deletePerson} />
          </li>
        ))}
      </ul>

      <br></br>
      <br></br>

      Add person:
      <form onSubmit={addPerson}>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">Add Person</button>
      </form>

      <br></br>
      Add penalty:
      <AddPenalty persons={persons} penaltyTypes={penaltyTypes}/>
    </div>
  )
}

export default App