import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const PopularAnecdote = (props) => {
  if (props.voteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  } else {
    return (
      <div>
        <p>{props.anecdote}</p>
        <p>Has {props.voteCount} votes</p>
      </div>
    )
  }
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const numberOfAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(numberOfAnecdotes).fill(0))
  const [popularAnecdote, setPopularAnecdote] = useState({ index: 0, voteCount: 0 })

  const handleNextClick = () => {
    let newAnecdoteIndex = Math.floor(Math.random() * numberOfAnecdotes);
    setSelected(newAnecdoteIndex)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
    const currentVoteCount = copy[selected]
    if (currentVoteCount > popularAnecdote.voteCount) {
      const newPopularAnecdote = { index: selected, voteCount: currentVoteCount }
      setPopularAnecdote(newPopularAnecdote)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button text='Vote' handleClick={handleVoteClick} />
      <Button text='Next Anecdote' handleClick={handleNextClick} />
      <h1>Anecdote with the most votes:</h1>
      <PopularAnecdote anecdote={anecdotes[popularAnecdote.index]} voteCount={popularAnecdote.voteCount} />
    </div>
  )
}

export default App