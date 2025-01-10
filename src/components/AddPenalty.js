import penaltyService from '../services/penaltyService'
import { Formik, Form, Field } from 'formik'
import SelectField from './SelectField'
import InputField from './InputField'
import Button from './Button'

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
        <label htmlFor='name' className="mr-2">Name:</label>
        <Field
          as={SelectField}
          id='name'
          name='personId'
          className="my-1"
          >
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
          <option value="">Choose name</option>
        </Field>
        <br></br>
        <label htmlFor='type' className="mr-2">Type:</label>
        <Field
          as={SelectField}
          id='type'
          name='type'
          className="my-1"
          >
            {penaltyTypes.map((penaltyType) => (
              <option key= {penaltyType.id} value={penaltyType.id}>
                {penaltyType.type}
              </option>
            ))}
            <option value="">Choose type</option>
        </Field>
        <br></br>
        <label htmlFor='date' className="mr-2">Date:</label>
        <Field
          as={InputField}
          id='date'
          name='date'
          type='date'
          className="my-1"
          >
        </Field>
        <br></br>
        <label htmlFor='sum' className="mr-2">Sum:</label>
        <Field
        as={InputField}
          id='sum'
          name='sum'
          type='number'
          className="my-1"
          >
        </Field>
        <br></br>
        <label htmlFor='comment' className="mr-2">Comment:</label>
        <Field
          as={InputField}
          id='comment'
          name='comment'
          type='text'
          className="my-1"
          >
        </Field>
        <br></br>
        <Button type='submit' className="mt-1">Add penalty</Button>
      </Form>
    </Formik>
  )
}

export default AddPenalty