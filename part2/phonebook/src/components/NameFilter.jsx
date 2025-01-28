const NameFilter = (props) => {
    return (
        <div>
            Filter shown with: <input value={props.newNameFilter} onChange={props.handleNameFilterChange} />
        </div>
    )
}

export default NameFilter