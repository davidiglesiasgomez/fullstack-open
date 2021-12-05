import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const calculateAll = (good, neutral, bad) => {
  return good + neutral + bad
}

const calculateAverage = (good, neutral, bad) => {
  if ( calculateAll(good, neutral, bad) === 0 ) return 0
  return ( good - bad ) / calculateAll(good, neutral, bad)
}

const calculatePositive = (good, neutral, bad) => {
  if ( calculateAll(good, neutral, bad) === 0 ) return 0 + ' %'
  return ( good * 100 / calculateAll(good, neutral, bad) ) + ' %'
}

const Statistics = ({ good, neutral, bad }) => {
  if ( calculateAll(good, neutral, bad) === 0 ) return (
    <>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </>
  )

  return (
    <>
      <h2>statistics</h2>
      <table>
        <StatisticLine value={good} text="good" />
        <StatisticLine value={neutral} text="neutral" />
        <StatisticLine value={bad} text="bad" />
        <StatisticLine value={(calculateAll(good, neutral, bad))} text="all" />
        <StatisticLine value={(calculateAverage(good, neutral, bad))} text="average" />
        <StatisticLine value={(calculatePositive(good, neutral, bad))} text="positive" />
      </table>
    </>
  )
}

const StatisticLine  = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
