import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => a.votes<b.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnectode = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAnecdoteOf(id))
    dispatch(notify(`You voted '${votedAnectode.content}'`))
    setTimeout(() => {
      dispatch(notify(''))
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList