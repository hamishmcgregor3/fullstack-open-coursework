import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    countriesService.getAll()
      .then(countriesData => {
        setAllCountries(countriesData)
      })
  }, [])

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredCountries = allCountries.filter(country => {
    if (country.name.common.toLowerCase().includes(searchValue.toLowerCase())) {
      return country
    }
  })

  return (
    <div>
      <h1>Countries</h1>
      <form>
        Search for a country:
        <input value={searchValue} onChange={handleSearchValue}></input>
      </form>
      <Countries countriesArray={filteredCountries} filterValue={searchValue}/>
    </div>
  )
}

export default App