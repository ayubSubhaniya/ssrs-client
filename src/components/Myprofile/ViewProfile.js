import React, { Component } from "react";
import "../../styles/ViewProfile.css";

export function ViewProfile(props) {
    console.log("Hello there this the viewProfile");
    console.log(props.user);
    return (
        <div class="container">
            <div class="parent">
                <div class="quick-view">
                    this is the quick view
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
                                    {props.user.name.firstName}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                        </td>
                                <td>
                                    {props.user.name.lastName}
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ViewProfile;