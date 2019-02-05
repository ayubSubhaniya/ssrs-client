import React, {PureComponent} from 'react';
import '../../styles/table.css';
import EditUserModalBody from './EditUserModalBody';

class EditUserModal extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-light" data-toggle="modal"
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
