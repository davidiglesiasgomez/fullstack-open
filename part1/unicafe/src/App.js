import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ value, text }) => {
  return (
    <p>{text} {value}</p>
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

  const calculateAll = () => {
    return good + neutral + bad
  }

  const calculateAverage = () => {
    if ( calculateAll() === 0 ) return 0
    return ( good - bad ) / calculateAll()
  }

  const calculatePositive = () => {
    if ( calculateAll() === 0 ) return 0 + ' %'
    return ( good * 100 / calculateAll() ) + ' %'
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Statistic value={good} text="good" />
      <Statistic value={neutral} text="neutral" />
      <Statistic value={bad} text="bad" />
      <Statistic value={(calculateAll())} text="all" />
      <Statistic value={(calculateAverage())} text="average" />
      <Statistic value={(calculatePositive())} text="positive" />
    </div>
  )
}

export default App
