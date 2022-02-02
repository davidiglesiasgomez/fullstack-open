const getId = () => (100000 * Math.random()).toFixed(0)

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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: '@anecdote/init',
    data: anecdotes,
  }
}

export const voteAnecdoteOf = (id) => {
  return {
    type: '@anecdote/vote',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: '@anecdote/new',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer