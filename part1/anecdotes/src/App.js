import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [voted, setVoted] = useState([0, 0, 0, 0, 0, 0, 0])

  const [topone, setTopOne] = useState(null)

  const handleClick = () => {
    const aleatorio = parseInt(Math.random() * (anecdotes.length - 0) + 0)
    setSelected(aleatorio)
  }

  const handleVote = () => {
    const copy = { ...voted }
    copy[selected] += 1
    setVoted(copy)

    const newtopone = Object.values(copy).indexOf(Math.max(...Object.values(copy)))
    setTopOne(newtopone)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {voted[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      { topone === null ? <></> :
        <>
          <p>{anecdotes[topone]}</p>
          <p>Has {voted[topone]} votes</p>
        </>
      }     
    </div>
  )
}

export default App