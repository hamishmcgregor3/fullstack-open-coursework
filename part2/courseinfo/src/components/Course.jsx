const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map(part =>
                <li key={part.id}>
                    <Part name={part.name} exercises={part.exercises} />
                </li>
            )}
        </ul>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <div>
            <p>
                <strong>Total of {total} exercises</strong>
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course