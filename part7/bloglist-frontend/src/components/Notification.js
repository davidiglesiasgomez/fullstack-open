import React from 'react'
import { useSelector } from 'react-redux'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const Notification = () => {
  const notifications = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <ToastContainer className="p-3" position="top-end">
      { notifications.map(notification =>
        <Toast key={notification.id} style={style} className={notification.className}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{notification.text}</Toast.Body>
        </Toast>
      )}
    </ToastContainer>
  )
}

export default Notification