import { useEffect, useState } from 'react'
import penaltyService from './services/penaltyService'
import personService from './services/personService'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Person = (props) => {
  const handleDeletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${props.person.name}`)) {
      props.deletePerson(props.person.id, props.person.name)
    }
  }
  return (
    <>
      <form>
        {props.person.name} <button onClick={handleDeletePerson}>Delete</button> <br></br>
        {props.penalties.map((penalty) => <span>{penalty.reason}: {penalty.sum / 100} €</span>)}
      </form>
    </>
  )
}

const AddPenalty = ({ persons }) => {
  const initialValues
      = {
      personId: '',
      reason: '',
      date: '',
      sum: '',
      comment: '',
    }

  const onSubmit = async (values, helpers) => {
      //alert(JSON.stringify(values, null, 2));
      await penaltyService.createPenalty(values)
      helpers.resetForm()
      window.location.reload()
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <label htmlFor='name'>Name:</label>
        <Field
          as='select'
          id='name'
          name='personId'>
          {persons.map((person) => (
            <option value={person.id}>
              {person.name}
            </option>
          ))}
          <option value="">Choose name</option>
        </Field>
        <br></br>
        <label htmlFor='name'>Reason:</label>
        <Field
          id='reason'
          name='reason'
          type='text'>
        </Field>
        <br></br>
        <label htmlFor='name'>Date:</label>
        <Field
          id='date'
          name='date'
          type='date'>
        </Field>
        <br></br>
        <label htmlFor='name'>Sum:</label>
        <Field
          id='sum'
          name='sum'
          type='number'>
        </Field>
        <br></br>
        <label htmlFor='name'>Comment:</label>
        <Field
          id='comment'
          name='comment'
          type='text'>
        </Field>
        <br></br>
        <button type='submit'>Add penalty</button>
      </Form>
    </Formik>
  )
}


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [penalties, setPenalties] = useState([])
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
        Persons
      </h1>
      <ul>
        {persons.map((person) => (
          <li>
            <Person key={person.name} person={person} penalties={penalties
              .filter((penalty) => penalty.personId === person.id)} deletePerson={deletePerson} />
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
      <AddPenalty persons={persons} />
    </div>
  )
}

export default App