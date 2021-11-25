import React, { useContext } from 'react';
import HangmanContext from '../context/HangmanContext';

const Notification = () => {
  const showNotification = useContext(HangmanContext);
  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <p>You have already entered this letter</p>
    </div>
  )
}

export default Notification;
