import penaltyService from '../services/penaltyService'
import { Formik, Form, Field } from 'formik'

const AddPenalty = ({ persons, penaltyTypes }) => {
  const initialValues
    = {
    personId: '',
    type: '',
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
        <label htmlFor='type'>Type:</label>
        <Field
          as='select'
          id='type'
          name='type'>
            {penaltyTypes.map((penaltyType) => (
              <option value={penaltyType.id}>
                {penaltyType.type}
              </option>
            ))}
            <option value="">Choose type</option>
        </Field>
        <br></br>
        <label htmlFor='date'>Date:</label>
        <Field
          id='date'
          name='date'
          type='date'>
        </Field>
        <br></br>
        <label htmlFor='sum'>Sum:</label>
        <Field
          id='sum'
          name='sum'
          type='number'>
        </Field>
        <br></br>
        <label htmlFor='comment'>Comment:</label>
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

export default AddPenalty