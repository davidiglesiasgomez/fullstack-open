import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      { props.notifications.map(notification =>
        <div key={notification.id} style={style}>
          {notification.text}
        </div>
      )}
    </>
  )
}

Notification.propTypes = {
  notifications: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification
  }
}

export default connect(mapStateToProps)(Notification)