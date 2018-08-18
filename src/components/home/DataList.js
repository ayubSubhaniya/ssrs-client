import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {timeSince} from "../../helper/Time";

class DataList extends Component {
    render() {
        const {data} = this.props
        return (
            <ListGroup>
                {
                    data.length
                        ? data.map(
                        (data) => (
                            <ListGroupItem key={data._id} header={data.message} href={"/" + data._id}>
                                {timeSince(new Date(data.createdOn)) + ' ago'}
                            </ListGroupItem>
                        ))
                        : <ListGroupItem> Nothing to show </ListGroupItem>
                }
            </ListGroup>
        );
    }
}


export default DataList;
