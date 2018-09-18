import React, {Component} from 'react';

class PickUpDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props
        return (
            <div className={'ml-4'}>
                <h6>
                    <strong>Collector's Name:</strong>{" " + data.name}
                </h6>
                <h6>
                    <strong>Collector's DA-IICT ID:</strong>{" " + data.daiictId}
                </h6>
                <h6>
                    <strong>Collector's Contact No.:</strong>{" " + data.contactNo}
                </h6>
                <h6>
                    <strong>Collector's email: </strong><a href={"mailto:" + data.email}>{" " + data.email}</a>}
                </h6>
            </div>
        )
    }
}

export default PickUpDetails;
