import noteService from '../services/notes'

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

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

export default noteReducer