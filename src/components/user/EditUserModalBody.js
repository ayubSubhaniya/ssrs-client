import React, {PureComponent} from 'react';
import {handleChange} from "../../helper/StateUpdate";

function TextField({value, handleChange, name, label}) {
    return (
        <div className="form-group row">
            <label className="col-3 col-form-label">{label}</label>
            <div className="col-9">
                <input type="text"
                       className="form-control"
                       name={name}
                       value={value}
                       onChange={handleChange}/>
            </div>
        </div>
    )
}

class EditUserModalBody extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.state = {
            daiictId: props.detail.daiictId,
            firstName: props.detail.name.firstName,
            lastName: props.detail.name.lastName,
            primaryEmail: props.detail.primaryEmail,
            contactNo: props.detail.contactNo,
            gender: props.detail.gender?props.detail.gender:'Male',
            userType: props.detail.userType == "student" ? 1 : 2,
            programme: props.detail.programme,
        }
    }

    changeGender = ({target}) => {
        this.setState({
            gender: target.value
        })
    }

    changeUserType = ({target}) => {
        this.setState({
            userType: target.value
        })
    }

    changeProgramme = (e) => {
        this.setState({
            programme: e.target.value
        })
    }

    onSubmit = () => {
        const user = {
            name: {
                firstName: this.state.firstName,
                lastName: this.state.lastName
            },
            contactNo: this.state.contactNo,
            gender: this.state.gender,
            userType: this.state.userType == 1 ? "student" : "superAdmin",
            programme: this.state.programme,
        }
        this.props.updateUser(user, this.props.index, this.state.daiictId, this.modal);
    }

    render() {
        return (
            <div className="modal" ref={modal => this.modal = modal} id={"myModal" + this.props.detail.daiictId}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form  onSubmit={this.onSubmit}>
                                <TextField value={this.state.daiictId}
                                           name="daiictId"
                                           label={"User ID"}/>
                                <TextField handleChange={this.handleChange}
                                           value={this.state.firstName}
                                           name="firstName"
                                           label={"First Name"}/>
                                <TextField handleChange={this.handleChange}
                                           value={this.state.lastName}
                                           name="lastName"
                                           label={"Last Name"}/>
                                <TextField value={this.state.primaryEmail}
                                           name="primaryEmail"
                                           label={"Primary Email"}/>
                                <TextField handleChange={this.handleChange}
                                           value={this.state.contactNo}
                                           name="contactNo"
                                           label={"Contact No."}/>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-3">Gender</legend>
                                        <div className="col-9" style={{display: 'flex'}}>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"
                                                           style={{display: "inline"}}
                                                           type="radio"
                                                           value="Male"
                                                           checked={this.state.gender == 'Male' ? true : false}
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
                                                           checked={this.state.gender == 'Female' ? true : false}
                                                           onClick={this.changeGender}/>
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="form-group row">
                                    <label className="col-3 col-form-label">Programme</label>
                                    <div className="col-9">
                                        <select className="form-control" onClick={this.changeProgramme} >
                                            <option hidden>{this.state.programme}</option>
                                            <option value="B.Tech (ICT)">B.Tech (ICT)</option>
                                            <option value="B.Tech (ICT+CS)">B.Tech (ICT+CS)</option>
                                            <option value="M.Tech">M.Tech</option>
                                            <option value="M.Sc.IT">M.Sc.IT</option>
                                            <option value="M.Des">M.Des</option>
                                            <option value="Ph.D">Ph.D</option>
                                        </select>
                                    </div>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-3">User Type</legend>
                                        <div className="col-9" style={{display: 'flex'}}>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"
                                                           style={{display: "inline"}}
                                                           type="radio"
                                                           value="1"
                                                           checked={this.state.userType == 1 ? true : false}
                                                           onClick={this.changeUserType}/>
                                                    Student
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input className="form-check-input"
                                                           style={{display: "inline"}}
                                                           type="radio"
                                                           value="2"
                                                           checked={this.state.userType == 2 ? true : false}
                                                           onClick={this.changeUserType}/>
                                                    Super Admin
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default EditUserModalBody;
