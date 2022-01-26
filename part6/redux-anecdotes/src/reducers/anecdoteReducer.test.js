import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {

    test('returns new state with action @anecdote/vote', () => {
        const state = [
          {
            content: 'anecdote #1',
            id: 1,
            votes: 0
          },
          {
            content: 'anecdote #2',
            id: 2,
            votes: 0
          }]

        const action = {
          type: '@anecdote/vote',
          data: {
            id: 2
          }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)

        expect(newState).toContainEqual(state[0])

        expect(newState).toContainEqual({
          content: 'anecdote #2',
          id: 2,
          votes: 1
        })
    })

    test('returns new state with action @anecdote/new', () => {
        const state = []
        const action = {
          type: '@anecdote/new',
          data: {
            content: 'new anecdote',
            id: 1,
            votes: 0
          }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
      })
})