const AddContactForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleOnSubmit}>
                <div>
                    Name: <input value={props.nameValue} onChange={props.handleNameValueChange} />
                </div>
                <div>
                    Number: <input value={props.numberValue} onChange={props.handleNumberValueChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddContactForm