import React from "react";
import "../../styles/ViewProfile.css";
import Avatar from 'react-avatar';
import Address from './Address.js'
import AuthorizedComponent from "../AuthorizedComponent";
import { isStudent } from "../../helper/userType";

const color = ['red', 'green', 'purple', 'cyan', 'teal', 'blue'];
const getcolor = () => {
    return color[Math.floor(Math.random() * 8)];
}
export default function ViewProfile(props) {
    const userInfo = props.user.userInfo;
    return (
        <div className="container">
            <div className="parent">
                <div className="quick-view" id="avatar_position">
                    <Avatar color={getcolor()} round={true} size={120}
                        name={userInfo.user_first_name + (userInfo.user_last_name ? " " + userInfo.user_last_name : "")} />
                    <div className="name-style">{userInfo.user_first_name} {userInfo.user_last_name}</div>
                </div>
                <div className="info-table" >
                    <table className="table table-striped" >
                        <tbody>
                            <tr>
                                <td> <strong>Daiict Id</strong></td>
                                <td> {props.user.daiictId} </td>
                            </tr>
                            <tr>
                                <td> <strong>First Name</strong></td>
                                <td> {userInfo.user_first_name ? userInfo.user_first_name : ''} </td>
                            </tr>
                            <tr>
                                <td> <strong>Last Name</strong></td>
                                <td> {userInfo.user_last_name ? userInfo.user_last_name : ''} </td>
                            </tr>
                            <tr>
                                <td> <strong>Primary Email</strong></td>
                                <td> {props.user.primaryEmail} </td>
                            </tr>
                            <tr>
                                <td> <strong>Contact No</strong></td>
                                <td> {props.user.contactNo ? props.user.contactNo : userInfo.user_adr_mobileno} </td>
                            </tr>
                            <tr>
                                <td> <strong>Gender</strong></td>
                                <td> {userInfo.user_sex} </td>
                            </tr>
                            <tr>
                                <td> <strong>Programme</strong></td>
                                <td> {userInfo.user_programme} </td>
                            </tr>
                            <tr>
                                <td> <strong>Batch</strong></td>
                                <td> {userInfo.user_batch} </td>
                            </tr>
                            <tr>
                                <td> <strong>User Type</strong></td>
                                <td> {userInfo.user_type} </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button"
                        className="btn btn-outline-primary style-btn"
                        onClick={props.changeIsEdit}>
                        Edit
                    </button>
                </div>
            </div>
            {
                isStudent(props.user)
                ?   <div className="add-header">
                        <h2 style={{"margin-left": "8px"}}>Saved Addresses</h2>
                        <hr style={{"borderWidth": "3px", "background": "#343a42"}}/>
                    </div>
                : <div></div>
            }
            <div className="container">
                <AuthorizedComponent
                    component={Address}
                    permission={isStudent(props.user)} />
            </div>
        </div>
    );
}
