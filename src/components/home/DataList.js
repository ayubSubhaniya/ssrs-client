import React, {Component} from 'react';
import {timeSince} from "../../helper/Time";

class DataList extends Component {
    render() {
        const {data} = this.props
        return (
            <div className={'list-group'}>

                {

                    data.length!==0
                        ? data.map(
                        (data,i) => (
                            <a href={data._id} key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                                <h5 className="mb-1">{data.message}</h5>
                                <small className="text-muted"> {timeSince(new Date(data.createdOn)) + ' ago'}</small>
                            </a>
                        ))
                        : <li className="list-group-item list-group-item-action flex-column align-items-start"> Nothing to show </li>
                }
            </div>
        );
    }
}


export default DataList;
