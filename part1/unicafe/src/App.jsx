import { useState } from 'react'

const Title = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.allClicksTotal === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={props.goodTotal} />
          <StatisticLine text='neutral' value={props.neutralTotal} />
          <StatisticLine text='bad' value={props.badTotal} />
          <StatisticLine text='all' value={props.allClicksTotal} />
          <StatisticLine text='average' value={props.averageTotal / props.allClicksTotal} />
          <StatisticLine text='positive' value={(props.goodTotal / props.allClicksTotal) * 100} />
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{text === 'positive' ? '%' : ''}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)
  const [averageScore, setAverageScore] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAverageScore(averageScore + 1)
    setAllClicks(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllClicks(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAverageScore(averageScore - 1)
    setAllClicks(allClicks + 1)
  }

  return (
    <div>
      <Title title='Give Feedback' />
      <Button text='good' handleClick={handleGoodClick} />
      <Button text='neutral' handleClick={handleNeutralClick} />
      <Button text='bad' handleClick={handleBadClick} />
      <Title title='Statistics' />
      <Statistics goodTotal={good} neutralTotal={neutral} badTotal={bad} allClicksTotal={allClicks} averageTotal={averageScore} />
    </div>
  )
}

export default App