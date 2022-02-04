import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  if (action.type === '@anecdote/init') {
    return action.data
  }

  if (action.type === '@anecdote/vote') {
    return state.map(anecdote =>
      anecdote.id === action.data.id ? action.data : anecdote
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

export const voteAnecdoteOf = anecdote => {
  return async dispatch => {
    const anecdoteVoted = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: '@anecdote/vote',
      data: anecdoteVoted,
    })
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