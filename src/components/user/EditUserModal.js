import React, {Component} from 'react';
import '../../styles/table.css';
import EditUserModalBody from './EditUserModalBody';

class EditUser extends Component {

    constructor(props, context){
        super(props, context);
    }

    render(){
        console.log(this.props.detail);
        return(
            <div>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#myModal" + this.props.detail.daiictId}>
                    Edit User
                </button>
                <EditUserModalBody detail={this.props.detail}/>
           </div>
        );
    }
}

export default EditUser;
