import { useState, useEffect } from 'react'
import personService from './services/note'
import Person from './components/Person'
import AddContactForm from './components/AddContactForm'
import NameFilter from './components/NameFilter'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setnewNameFilter] = useState('')
  const [newNotification, setNewNotification] = useState(null)
  const [newNotificationStyles, setNewNotificationStyles] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addToPhonebook = (event) => {
    event.preventDefault()
    const allNames = persons.map(person => person.name)

    if (allNames.includes(newName)) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) === true) {
        updatePerson()
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }

      personService
        .add(newPersonObject)
        .then(addedPerson => {
          console.log(addedPerson)
          setPersons(persons.concat(addedPerson))
          setNewNotification(`Added ${addedPerson.name} to your phonebook`)
          setNewNotificationStyles('success-notification')
          setTimeout(() => {
            setNewNotification(null)
            setNewNotificationStyles('')
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`) === true) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          const updatedPersons = persons.filter(person => person.id !== deletedPerson.id);
          setPersons(updatedPersons)
        })
    }
  }

  const updatePerson = () => {
    const personToUpdateObject = persons.find(person => person.name === newName);
    const updatedPersonObject = { ...personToUpdateObject, number: newNumber }
    personService
      .update(updatedPersonObject)
      .then(updatedPerson => {
        console.log(updatedPerson)
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        setNewNotification(`Updated ${updatedPerson.name}'s number`)
        setNewNotificationStyles('success-notification')
        setTimeout(() => {
          setNewNotification(null)
          setNewNotificationStyles('')
        }, 5000)
        // Above .map() function is the same as below just using conditional expression with ternary operator

        // setPersons(persons.map(person => { 
        //   if (person.id === updatedPerson.id) { 
        //     return updatedPerson
        //   } else { 
        //     return person
        //   }
        // }))
      })
      .catch(error => {
        setNewNotification(`Information of ${updatedPersonObject.name} has already been removed from the server`)
        setNewNotificationStyles('error-notification')
        setTimeout(() => {
          setNewNotification(null)
          setNewNotificationStyles('')
        }, 5000)
        setPersons(persons.filter(person => person.id !== updatedPersonObject.id))
      })
  }

  const filteredContacts = persons.filter(person => {
    if (person.name.toLowerCase().includes(newNameFilter.toLowerCase())) {
      return person
    }
  })

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleNameFilterChange = (event) => { setnewNameFilter(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} notificationStyles={newNotificationStyles} />
      <NameFilter newNameFilter={newNameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>Add Contact:</h2>
      <AddContactForm
        handleOnSubmit={addToPhonebook}
        nameValue={newName}
        handleNameValueChange={handleNameChange}
        numberValue={newNumber}
        handleNumberValueChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredContacts.map(person =>
          <li key={person.id}>
            <Person name={person.name} number={person.number} handleDelete={() => deletePerson(person)} />
          </li>
        )}
      </ul>
    </div>
  )
}

export default App