import React, { Component } from "react";
import "../../styles/ViewProfile.css";
import Avatar from 'react-avatar';

export default function ViewProfile(props) {
    console.log(props.user);
    return (
        <div class="container">
            <div class="parent">
                <div class="quick-view">
                    <Avatar name={props.user.name.firstName} color={Avatar.getRandomColor('sitebase', ['red', 'green' , 'Yellow', 'Purple'])} size="150" textSizeRatio="1.75" round={true} />
                    <div class="name-style">{props.user.name.firstName} {props.user.name.lastName}</div>
                </div>
                <div class="info-table">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <td>
                                    Daiict Id
                        </td>
                                <td>
                                    {props.user.daiictId}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    First Name
                        </td>
                                <td>
                                    {props.user.name.firstName?props.user.name.firstName:''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                        </td>
                                <td>
                                    {props.user.name.lastName?props.user.name.lastName:''}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Primary Email
                        </td>
                                <td>
                                    {props.user.primaryEmail}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Contact No
                        </td>
                                <td>
                                    {props.user.contactNo}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Gender
                        </td>
                                <td>
                                    {props.user.gender}
                                </td>
                            </tr>
                        <tr>
                                <td>
                                    Programme
                                </td>
                                <td>
                                    {props.user.programme}
                                </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
