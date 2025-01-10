import Button from "./Button"

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
        <span className="text-lg font-bold">
          Penalties:
        </span>
        <div>
          {props.penalties.map((penalty) => {
            const penaltyType = props?.penaltyTypes?.find((type) => type.id === penalty.type)
            return <ul> {penaltyType?.type}: {penalty.sum / 100}€</ul>
          })}
        </div>
        <Button onClick={handleDeletePerson} className="bg-red-200 !border-red-400 text-red-700 mt-2">Delete {props.person.name}</Button>
      </form>
    </>
  )
}

export default Person
