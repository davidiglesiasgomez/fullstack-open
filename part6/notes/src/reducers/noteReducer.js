const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return [...state, action.data]
  }

  if (action.type === 'TOGGLE_IMPORTANCE') {
    const noteToChange = state.find(note => note.id === action.data.id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    return state.map(note =>
      note.id === action.data.id ? changedNote : note
    )
  }

  if (action.type === 'INIT_NOTES') {
    return action.data
  }

  return state
}

export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  }
}

export default noteReducer