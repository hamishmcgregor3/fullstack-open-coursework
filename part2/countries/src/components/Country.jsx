const Country = (props) => {
    const languages = props.countryDetails.languages
    
    return (
        <div>
            <h2>{props.countryDetails.name.common}</h2>
            <p>Capital: {props.countryDetails.capital}</p>
            <p>Area: {props.countryDetails.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={props.countryDetails.flags.png} />
        </div>
    )
}

export default Country