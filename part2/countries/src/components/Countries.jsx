import Country from "./Country"
import { useState, useEffect } from 'react'

const Countries = (props) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => { 
        setSelectedCountry(null)
    }, [props.filterValue])


    if (props.filterValue === '') {
        return
    }

    if (selectedCountry) {
        return (
            <Country countryDetails={selectedCountry} />
        )
    }

    if (props.countriesArray.length === 1) {
        const singleCountryObject = props.countriesArray[0]
        return (
            <Country countryDetails={singleCountryObject} />
        )
    }

    if (props.countriesArray.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    const handleShowCountryDetails = (countryToShow) => {
        setSelectedCountry(countryToShow)
    }

    return (
        <div>
            <ul>
                {props.countriesArray.map(country =>
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => handleShowCountryDetails(country)}>Show Details</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Countries