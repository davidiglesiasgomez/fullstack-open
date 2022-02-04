import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@anecdote/init') {
    return action.data
  }

  if (action.type === '@anecdote/vote') {
    const anecdoteToChange = state.find(anecdote => anecdote.id === action.data.id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    return state.map(anecdote =>
      anecdote.id === action.data.id ? changedAnecdote : anecdote
    )
  }

  if (action.type === '@anecdote/new') {
    return state.concat(action.data)
  }

  return state
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: '@anecdote/init',
      data: anecdotes,
    })
  }
}

export const voteAnecdoteOf = (id) => {
  return {
    type: '@anecdote/vote',
    data: { id }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: '@anecdote/new',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer