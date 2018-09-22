import React, {Component} from 'react';

class EditUserModalBody extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = { programme: props.detail.programme};
    }

    handleChange(event) {
        this.state.fruit = event.target.value;
        console.log(this.state.fruit);
    }

    render() {
        return(
            <div class="modal" id={"myModal" + this.props.detail.daiictId}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit User</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <div class="modal-body">                                
                            <form action="/html/tags/html_form_tag_action.cfm">
                                <div class="form-group row">
                                    <label for="first_name" class="col-3 col-form-label">User ID</label>
                                    <div class="col-9">
                                        <input type="text" class="form-control" id="first_name" name="user_id" placeholder={this.props.detail.daiictId}/>
                                    </div>
                                </div>
                                <div class="form-group row" >
                                    <label for="first_name" class="col-3 col-form-label">First Name</label>
                                    <div class="col-9">
                                        <input type="text" class="form-control" id="first_name" name="first_name" value={this.props.detail.name.firstName}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="last_name" class="col-3 col-form-label">Last Name</label>
                                    <div class="col-9">
                                        <input type="text" class="form-control" id="last_name" name="last_name" value={this.props.detail.name.lastName}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="last_name" class="col-3 col-form-label">Primary Email</label>
                                    <div class="col-9">
                                        <input type="email" class="form-control" id="primary_email" name="primary_email" value={this.props.detail.primaryEmail}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="last_name" class="col-3 col-form-label">Contact No</label>
                                    <div class="col-9">
                                        <input type="text" class="form-control" id="contact_no" name="contact_no" value={""+this.props.detail.contactNo}/>
                                    </div>
                                </div>
                                <fieldset class="form-group">
                                    <div class="row">
                                        <legend class="col-form-label col-3">Gender</legend>
                                        <div class="col-9" style={{display:'flex'}}>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" style={{ display: "inline" }} type="radio" name="legendRadio" id="legendRadio1" value="1" />
                                                    Male
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" style={{ display: "inline" }} type="radio" name="legendRadio" id="legendRadio2" value="2" />
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="form-group row">
                                    <label for="last_name" class="col-3 col-form-label">Programme</label>
                                    <div class = "col-9">
                                        <select class="form-control" onChange={this.handleChange}>
                                            <option hidden >{this.props.detail.programme}</option>
                                            <option value="B.Tech (ICT)">B.Tech (ICT)</option>
                                            <option value="B.Tech (ICT+CS)">B.Tech (ICT+CS)</option>
                                            <option value="M.Tech">M.Tech</option>
                                            <option value="M.Sc.IT">M.Sc.IT</option>
                                            <option value="M.Des">M.Des</option>
                                            <option value="Ph.D">Ph.D</option>             
                                        </select>
                                    </div>
                                    {/* <div class="dropdown col-9">
                                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.props.detail.programme}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">B.Tech (ICT)</a>
                                            <a class="dropdown-item" href="#">B.Tech (ICT+CS)</a>
                                            <a class="dropdown-item" href="#">M.Tech</a>
                                            <a class="dropdown-item" href="#">M.Sc.IT</a>
                                            <a class="dropdown-item" href="#">M.Des</a>
                                            <a class="dropdown-item" href="#">Phd</a>                                                                                                        
                                        </div>
                                    </div>                                             */}
                                </div>
                                <fieldset class="form-group">
                                    <div class="row">
                                        <legend class="col-form-label col-3">User Type</legend>
                                        <div class="col-9" style={{display:'flex'}}>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" style={{ display: "inline" }} type="radio" name="legendRadio" id="legendRadio1" value="1" />
                                                    Student
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" style={{ display: "inline" }} type="radio" name="legendRadio" id="legendRadio2" value="2" />
                                                    Super Admin
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset> 
                                <fieldset class="form-group">
                                    <div class="row">
                                        <legend class="col-form-label col-3">Status</legend>
                                        <div class="col-9" style={{display:'flex'}}>
                                            <div class="form-check form-check-inline">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" style={{ display: "inline" }} type="checkbox" id="inlineCheckBox1" value="1" />
                                                    Active
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset> 
                            </form>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    
                </div>
            </div>
        </div>
        );
    }
}

export default EditUserModalBody;