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
        {props.penalties.map((penalty) => {
          const penaltyType = props?.penaltyTypes?.find((type) => type.id === penalty.type)
        return <ul> {penaltyType?.type}: {penalty.sum / 100}€</ul>
        })}
      </form>
    </>
  )
}

export default Person
  