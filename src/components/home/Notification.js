import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {timeSince} from "../../js/Time";

class Notification extends Component {
    render() {
        return (
            <ListGroup>
                {
                    this.props.notification.map(
                        (notification) => (
                            <ListGroupItem key={notification._id} header={notification.message} href="#">
                                {timeSince(new Date(notification.createdOn)) + ' ago'}
                            </ListGroupItem>
                        ))
                }
            </ListGroup>
        );
    }
}


export default Notification;
