import React from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose, visible }) => {
  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'loading' && '⏳'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className="notification-message">{message}</span>
        {onClose && (
          <button className="notification-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification; 