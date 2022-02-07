import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notify(`You added '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func,
  notify: PropTypes.func,
}

const mapDispatchToProps = {
  createAnecdote,
  notify
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)