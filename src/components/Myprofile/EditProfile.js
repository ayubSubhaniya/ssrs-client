import React, { Component } from 'react';
import "../../styles/ViewProfile.css";

class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            name: { 
                firstName: props.user.name.firstName,
                lastName: props.user.name.lastName
            },
            contactNo: props.user.contactNo,
            gender: props.user.gender,
            programme: props.user.programme,
        }
    }
    changeProgramme = (e) => {
                console.dir(e.target);
                this.setState({
                    programme: e.target.value
                })
            }
    changeGender = (e) => {
        this.setState({
            gender : e.target.value
        })
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <form class="edit-profile"onSubmit={(e) => {
                    e.preventDefault();
                    this.props.updateUser(this.state);
                }}>
                    <table class="table table-striped ">
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
                                    <input type="text" value={this.state.name.firstName} onChange={(e) => {
                                        this.setState({
                                            name : {
                                                firstName : e.target.value,
                                                lastName : this.state.name.lastName
                                            }
                                        })
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                        </td>
                                <td>
                                <input type="text" value={this.state.name.lastName} onChange={(e) => {
                                        this.setState({
                                            name : {
                                                firstName : this.state.name.firstName,
                                                lastName : e.target.value
                                            }
                                        })
                                    }} />
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
                                <input type="text" value={this.state.contactNo} onChange={(e) => {
                                        this.setState({
                                            contactNo : e.target.value
                                        })
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Gender
                        </td>
                                <td>
                                <div className="col-9" style={{display: 'flex'}}>

                                            <div className="form-check form-check-inline">

                                                <label className="form-check-label">

                                                    <input className="form-check-input"

                                                           style={{display: "inline"}}

                                                           type="radio"

                                                           value="Male"

                                                           checked={this.state.gender === "Male" ? true : false}

                                                           onClick={this.changeGender}/>

                                                    Male

                                                </label>

                                            </div>

                                            <div className="form-check form-check-inline">

                                                <label className="form-check-label">

                                                    <input className="form-check-input"

                                                           style={{display: "inline"}}

                                                           type="radio"

                                                           value="Female"

                                                           checked={this.state.gender === "Female" ? true : false}

                                                           onClick={this.changeGender}/>

                                                    Female

                                                </label>

                                            </div>

                                        </div>
                                </td>
                            </tr>
                        <tr>
                                    <td>
                                        Programme
                                    </td>
                                    <td>
                                    <select onClick={this.changeProgramme}>

                                            <option hidden>{this.state.programme}</option>

                                            <option value="B.Tech (ICT)">B.Tech (ICT)</option>

                                            <option value="B.Tech (ICT+CS)">B.Tech (ICT+CS)</option>

                                            <option value="M.Tech">M.Tech</option>

                                            <option value="M.Sc.IT">M.Sc.IT</option>

                                            <option value="M.Des">M.Des</option>

                                            <option value="Ph.D">Ph.D</option>

                                        </select>
                                    </td>
                        </tr>
                        </tbody>
                    </table>
                  <input type="submit" class="btn btn-primary style-btn" value="Save" onClick={(e) => {
                    e.preventDefault();
                    this.props.changeIsEdit();
                    this.props.updateUser(this.state);
                }}/>
                </form>
            </div>
        );
    }
}

export default EditProfile;