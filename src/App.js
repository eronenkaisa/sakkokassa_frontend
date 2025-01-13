import { useEffect, useState, useMemo } from 'react'
import penaltyService from './services/penaltyService'
import personService from './services/personService'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import penaltyTypeService from './services/penaltyTypeService'
import AddPenalty from './components/AddPenalty'
import Person from './components/Person'
import Button from './components/Button'
import InputField from './components/InputField'
import SelectField from './components/SelectField'
import Navbar from './components/Navbar'
import About from './components/About'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [penalties, setPenalties] = useState([])
  const [penaltyTypes, setPenaltyTypes] = useState([])
  const [selectedPerson, setSelectedPerson] = useState([])
  const [deleteType, setDeleteType] = useState('success')
  const [deleteMessage, setDeleteMessage] = useState([])
  const [updateMessage, setUpdateMessage] = useState([])

  const currentPerson = useMemo(() => persons.find((person) => person.id === selectedPerson), [persons, selectedPerson])
  
  useEffect(() => {
    console.log(currentPerson)
  }, [currentPerson])

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
    <div className='min-h-screen bg-blue-100'> 
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/" element={
          
          <div className='container mx-auto px-4 py-8'>
            <div className='shadow-2xl my-4 p-2 bg-white rounded-md'>
              <span className="mr-2">
                <p className='text-lg font-bold'> Welcome to Sakkokassa!</p> 
                Choose your name: 
              </span>
              <SelectField
                id='name'
                name='personId'
                value={selectedPerson}
                onChange={e => setSelectedPerson(e.target.value)}>
                  <option>
                    Name
                  </option>
                  {persons.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                ))} 
                
              </SelectField>  
            {currentPerson && 
              <div>
                <Person person={currentPerson} penalties={penalties
                  .filter((penalty) => penalty.personId === currentPerson.id)} penaltyTypes={penaltyTypes} deletePerson={deletePerson}/>
              </div>}
            
              </div>

            <div className='shadow-2xl my-4 p-2 bg-white rounded-md'>
            <span className="text-lg font-bold">
                Add person:
              </span>
              <form onSubmit={addPerson} className="flex gap-2">
                <InputField
                  value={newName}
                  onChange={handleNameChange}
                />
                <Button type="submit">Add Person</Button>
              </form>
            </div>
            <div className='shadow-2xl my-4 p-2 bg-white rounded-md'>
              <span className="text-lg font-bold">
                Add penalty:
              </span>
              <AddPenalty persons={persons} penaltyTypes={penaltyTypes}/>
            </div>
          </div>
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App