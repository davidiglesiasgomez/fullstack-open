import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      { notifications.map(notification =>
        <div key={notification.id} style={style} className={notification.className}>
          {notification.text}
        </div>
      )}
    </>
  )
}

export default Notification