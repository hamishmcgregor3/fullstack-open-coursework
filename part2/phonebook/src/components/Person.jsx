const Person = (props) => {
    return (
        <div>
            {props.name}: {props.number}
            <button onClick={props.handleDelete}>Delete</button>
        </div>
    )
}

export default Person