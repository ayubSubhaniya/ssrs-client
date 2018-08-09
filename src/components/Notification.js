import React, { Component } from 'react';

class Notification extends Component {
  render() {
    return (
       <div className='notification-content'>
            <ul>
               { this.props.notification.map(
                  (notification) => (<li key={notification._id}>{notification.message}</li>)
                )
              }
            </ul>
        </div>
    );
  }
}

export default Notification;
