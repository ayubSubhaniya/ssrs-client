import React, {Component} from 'react';
import '../../styles/table.css';
import EditUserModalBody from './EditUserModalBody';

class EditUserModal extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log(this.props.detail);
        return (
            <div>
                <button type="button" class="btn btn-light" data-toggle="modal"
                        data-target={"#myModal" + this.props.detail.daiictId}>
                    <i className="fa fa-pencil"
                       style={{"fontSize": "24px", "color": "black"}}></i>
                </button>
                <EditUserModalBody {...this.props}/>
            </div>
        );
    }
}

export default EditUserModal;
