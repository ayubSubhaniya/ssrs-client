import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import "../../styles/ViewProfile.css";

function changeIsEdit(){
    this.setState({
        isEdit : !this.state.isEdit
    });
}

class Myprofile extends Component{
    constructor(props) {
        super();
        this.state = { 
            isEdit : false
        }
    }
    render(){
        console.log(this.props.user);
        return (
            <div>
                <NavigationBar/>
                <div>
                    {this.state.isEdit ? <EditProfile user={this.props.user} updateUser={this.props.updateUser} changeIsEdit={changeIsEdit.bind(this)}/> :<ViewProfile user={this.props.user} changeIsEdit={changeIsEdit.bind(this)} />}
                </div>
            </div>
        );
    }
}

export default Myprofile;