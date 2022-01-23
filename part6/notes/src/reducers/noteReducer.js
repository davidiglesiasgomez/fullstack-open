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

  return state
}

export default noteReducer