const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state = initialState, action) => {
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

const generateId = () =>
  Math.floor(Math.random() * 1000000)

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer