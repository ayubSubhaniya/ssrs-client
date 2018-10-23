import React, {Component} from 'react';
import "../../styles/ViewProfile.css";
import {handleChange} from "../../helper/StateUpdate";

class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            contactNo: props.user.contactNo
        }
        this.handleChange = handleChange.bind(this);
    }

    render() {
        const userInfo = this.props.user.userInfo;
        return (
            <div>
                <form class="edit-profile" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.changeIsEdit();
                    this.props.updateUser(this.state);
                }}>
                    <table class="table table-striped ">
                        <tbody>
                        <tr>
                            <td>Daiict Id </td>
                            <td> {this.props.user.daiictId} </td>
                        </tr>
                        <tr>
                            <td> First Name</td>
                            <td> {userInfo.user_first_name ? userInfo.user_first_name : ''} </td>
                        </tr>
                        <tr>
                            <td> Last Name</td>
                            <td> {userInfo.user_last_name ? userInfo.user_last_name : ''} </td>
                        </tr>
                        <tr>
                            <td>Primary Email</td>
                            <td>{this.props.user.primaryEmail}</td>
                        </tr>
                        <tr>
                            <td> Contact No </td>
                            <td>
                                <input type="text"
                                       value={this.state.contactNo}
                                       name='contactNo'
                                       onChange={this.handleChange}
                                       required='true'
                                       pattern="[0-9]{10}" />
                            </td>
                        </tr>
                        <tr>
                            <td> Gender</td>
                            <td> {userInfo.user_sex} </td>
                        </tr>
                        <tr>
                            <td> Programme</td>
                            <td> {userInfo.user_programme} </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="submit" class="btn btn-primary style-btn" value="Save"/>
                </form>
            </div>
        );
    }
}

export default EditProfile;
