import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {timeSince} from "../../helper/Time";

class DataList extends Component {
    render() {
        const {data} = this.props
        return (
            <ListGroup >
                {
                    data.length
                        ? data.map(
                        (data) => (
                            <ListGroupItem className={'li-grp-bg'} key={data._id} header={data.message} href={"/" + data._id}>
                                {timeSince(new Date(data.createdOn)) + ' ago'}
                            </ListGroupItem>
                        ))
                        : <ListGroupItem className={'li-grp-bg'}> Nothing to show </ListGroupItem>
                }
            </ListGroup>
        );
    }
}


export default DataList;
