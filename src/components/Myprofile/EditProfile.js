import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            firstName: props.user.name.firstName,
            lastName: props.user.name.lastName,
            gender: props.user.gender,
            programme: props.user.programme,
        }
    }
    render() {
        return (
            <div>
                <form>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <td>
                                Daiict Id
                        </td>
                            <td>
                                {this.props.user.daiictId}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                First Name
                        </td>
                            <td>
                                {this.props.user.name.firstName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Last Name
                        </td>
                            <td>
                                {this.props.user.name.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Primary Email
                        </td>
                            <td>
                                {this.props.user.primaryEmail}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contact No
                        </td>
                            <td>
                                {this.props.user.contactNo}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gender
                        </td>
                            <td>
                                {this.props.user.gender}
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>
            </div>
        );
    }
}

export default EditProfile;