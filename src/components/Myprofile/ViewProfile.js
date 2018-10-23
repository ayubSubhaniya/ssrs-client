import React from "react";
import "../../styles/ViewProfile.css";
import Avatar from 'react-avatar';
import Address from './Address.js'
import AuthorizedComponent from "../AuthorizedComponent";
import {isStudent} from "../../helper/userType";

const color = ['red', 'green', 'purple', 'cyan', 'teal', 'blue'];
const getcolor = () => {
    return color[Math.floor(Math.random() * 8)];
}
export default function ViewProfile(props) {
    const userInfo = props.user.userInfo;
    return (
        <div className="container">
            <div className="parent">
                <div className="quick-view">
                    <Avatar color={getcolor()} round={true} size={120}
                            name={userInfo.user_first_name + " " + userInfo.user_last_name}/>
                    <div className="name-style">{userInfo.user_first_name} {userInfo.user_last_name}</div>
                </div>
                <div className="info-table">
                    <table className="table table-striped">
                        <tbody>
                        <tr>
                            <td> Daiict Id</td>
                            <td> {props.user.daiictId} </td>
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
                            <td> Primary Email</td>
                            <td> {props.user.primaryEmail} </td>
                        </tr>
                        <tr>
                            <td> Contact No</td>
                            <td> {props.user.contactNo} </td>
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
                    <button type="button"
                            className="btn btn-primary style-btn"
                            onClick={props.changeIsEdit}>
                        Edit
                    </button>
                </div>
            </div>
            <div className="parent">
                <AuthorizedComponent
                    component={Address}
                    permission={isStudent(props.user)}/>
            </div>
        </div>
    );
}
