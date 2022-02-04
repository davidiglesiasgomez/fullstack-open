import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes
    .filter(anecdote => ( state.filter === ''
      ? true
      : anecdote.content.match(new RegExp(state.filter, 'i'))
    ))
    .sort((anecdoteA, anecdoteB) => anecdoteA.votes<anecdoteB.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnectode = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAnecdoteOf(votedAnectode))
    dispatch(notify(`You voted '${votedAnectode.content}'`, 5))
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