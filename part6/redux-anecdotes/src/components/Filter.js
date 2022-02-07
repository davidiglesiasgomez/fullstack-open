import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

Filter.propTypes = {
  filterChange: PropTypes.func
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)