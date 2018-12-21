import React, {Component} from 'react';
import '../../styles/table.css';
import Spinner from "../Spinner";
import {domainUrl, modalMessages} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import Switch from "../Switch";
import FileUpload from "../FileUpload/FileUpload";
import {BootstrapTable, ExportCSVButton, SizePerPageDropDown, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {handleError} from "../../helper/error";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";
import _ from "lodash"
import {withAlert} from 'react-alert'

function UserDetails(props) {
    const userInfo = props.user.userInfo
    return (
        <React.Fragment>
            <td>{props.user.daiictId}</td>
            <td>{userInfo.user_first_name + ' ' + userInfo.user_last_name}</td>
            <td>{userInfo.user_type}</td>
            <td>
                <div className={'d-flex flex-direction-col'}>
                    {/*<EditUserModal detail={props.user} index={props.index} updateUser={props.updateUser} />*/}
                    <Switch
                        handleClick={() => props.toggleUserActiveStatus(props.index)}
                        index={props.index}
                        isChecked={props.user.isActive ? true : false}/>
                </div>
            </td>
        </React.Fragment>
    )
}

class BSTable extends Component {
    render() {
        if (this.props.data) {
            const data = this.props.data;
            return (
                <div>
                    <strong>Name:</strong> {data.name} <br/>
                    <strong>Id: </strong>{data.id} <br/>
                    <strong>User Type:</strong> {data.type} <br/>
                    {data.uni_email_id ? <span><strong>University email Id:</strong> {data.uni_email_id
                    + "@daiict.ac.in"} <br/></span> : ""}
                    {data.batch ? <span><strong>Batch: </strong>{data.batch} <br/></span> : ""}
                    {data.programme ? <span><strong>Programme: </strong>{data.programme} <br/></span> : ""}
                    <strong>Mobile No.: </strong>{data.mobileno} <br/>
                    <strong>Address:</strong> {data.address}
                    <br/>
                    {data.telno ? <span><strong>Teliphone No.: </strong>{data.telno}<br/></span> : ""}
                    {data.personal_email_id ?
                        <span><strong>Personal email Id:</strong> {data.personal_email_id}<br/></span> : ""}
                    <strong>Sex:</strong> {data.sex} <br/>
                    <strong>Status: </strong>{data.status} <br/>
                </div>
            )
        } else {
            return (<p>?</p>);
        }
    }
}


class UserList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: [],
            fetchedUser: [],
            userInfo: [],
            tableInfo: [],
            showSpinner: false,
            userDataRecord: "registeredUsers",
            totalUsers: 0
        };
    }

    componentDidMount() {
        this.asyncFetch();
        this.allFetch();
    }

    asyncFetch = () => {
        const that = this;
        that.setState({
            showSpinner: true
        })
        const baseu = '/user/all';
        const url = domainUrl + baseu;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
                const obj = JSON.parse(request.responseText);
                console.log(obj);
                var allUsers = [];
                for (var i = 0; i < obj['user'].length; i++) {
                    var userInfo = {
                        sr_no: i,
                        id: obj['user'][i].daiictId,
                        name: obj['user'][i].userInfo.user_first_name
                            + " " + (obj['user'][i].userInfo.user_middle_name ? obj['user'][i].userInfo.user_middle_name : "")
                            + " " + obj['user'][i].userInfo.user_last_name,
                        type: obj['user'][i].userInfo.user_type,
                        batch: obj['user'][i].userInfo.user_batch,
                        programme: obj['user'][i].userInfo.user_programme,
                        expand: {
                            id: obj['user'][i].userInfo.user_inst_id,
                            name: obj['user'][i].userInfo.user_first_name
                                + " " + (obj['user'][i].userInfo.user_middle_name ? obj['user'][i].userInfo.user_middle_name : "")
                                + " " + obj['user'][i].userInfo.user_last_name,
                            type: obj['user'][i].userInfo.user_type,
                            uni_email_id: obj['user'][i].userInfo.user_email_id,
                            batch: obj['user'][i].userInfo.user_batch,
                            programme: obj['user'][i].userInfo.user_programme,
                            mobileno: obj['user'][i].userInfo.user_adr_mobileno,
                            address: (obj['user'][i].userInfo.user_adr_line1 ? obj['user'][i].userInfo.user_adr_line1 : "")
                                + (obj['user'][i].userInfo.user_adr_line2 ? ', ' + obj['user'][i].userInfo.user_adr_line2 : "")
                                + (obj['user'][i].userInfo.user_adr_line3 ? ', ' + obj['user'][i].userInfo.user_adr_line3 : "")
                                + (obj['user'][i].userInfo.user_adr_district ? ', ' + obj['user'][i].userInfo.user_adr_district : "")
                                + (obj['user'][i].userInfo.user_adr_city ? ', ' + obj['user'][i].userInfo.user_adr_city : "")
                                + (obj['user'][i].userInfo.user_adr_state ? ', ' + obj['user'][i].userInfo.user_adr_state : "")
                                + (obj['user'][i].userInfo.user_adr_country ? ', ' + obj['user'][i].userInfo.user_adr_country : "")
                                + (obj['user'][i].userInfo.user_adr_pincode ? ' - ' + obj['user'][i].userInfo.user_adr_pincode : ""),
                            telno: obj['user'][i].userInfo.user_adr_telno,
                            personal_email_id: obj['user'][i].userInfo.user_adr_emailid,
                            sex: obj['user'][i].userInfo.user_sex === 'M' ? "Male" : "Female",
                            status: obj['user'][i].userInfo.user_status
                        }
                    }
                    allUsers.push(userInfo);
                }

                //          console.log(allUsers);
                that.setState({
                    'user': allUsers,
                    fetchedUser: obj['user']
                })
            } else {
                handleError(request)
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    }

    allFetch = () => {
        const that = this;
        loadSpinner();
        const url = domainUrl + '/' + 'userInfo'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
                const obj = JSON.parse(request.responseText);
                console.log(obj);
                let allUsers = _.map(obj.userInfo, (x, i) => {
                    const userInfo = x;
                    userInfo.sr_no = i;
                    return userInfo;
                });

                // allUsers = _.map(obj,(o,i) => {
                //     o = o.userInfo;
                //     const userInfo = {
                //         sr_no: i,
                //         id: o.user_inst_id,
                //         name: o.user_first_name
                //             + " " + (o.user_middle_name ? o.user_middle_name : "")
                //             + " " + o.user_last_name,
                //         type: o.user_type,
                //         batch: o.user_batch,
                //         programme: o.user_programme,
                //         expand: {
                //             id: o.user_inst_id,
                //             name: o.user_first_name
                //                 + " " + (o.user_middle_name ? o.user_middle_name : "")
                //                 + " " + o.user_last_name,
                //             type: o.user_type,
                //             uni_email_id: o.user_email_id,
                //             batch: o.user_batch,
                //             programme: o.user_programme,
                //             mobileno: o.user_adr_mobileno,
                //             address: o.user_adr_line1 + ', ' + o.user_adr_line2
                //                 + ', ' + o.user_adr_line3
                //                 + ', ' + o.user_adr_district
                //                 + ', ' + o.user_adr_city
                //                 + ', ' + o.user_adr_state
                //                 + ', ' + o.user_adr_country
                //                 + ' - ' + o.user_adr_pincode,
                //             telno: o.user_adr_telno,
                //             personal_email_id : o.user_adr_emailid,
                //             sex: o.user_sex === 'M' ? "Male" : "Female",
                //             status: o.user_status
                //         }
                //     }
                //     return userInfo;
                // })
                // for(var i = 0; i < obj['userInfo'].length; i++) {
                //     var userInfo = {
                //         sr_no: i,
                //         id: obj['userInfo'][i].user_inst_id,
                //         name: obj['userInfo'][i].user_first_name
                //                             + " " + (obj['userInfo'][i].user_middle_name ? obj['userInfo'][i].user_middle_name : "")
                //                             + " " + obj['userInfo'][i].user_last_name,
                //         type: obj['userInfo'][i].user_type,
                //         batch: obj['userInfo'][i].user_batch,
                //         programme: obj['userInfo'][i].user_programme,
                //         expand: {
                //             id: obj['userInfo'][i].user_inst_id,
                //             name: obj['userInfo'][i].user_first_name
                //                     + " " + (obj['userInfo'][i].user_middle_name ? obj['userInfo'][i].user_middle_name : "")
                //                     + " " + obj['userInfo'][i].user_last_name,
                //             type: obj['userInfo'][i].user_type,
                //             uni_email_id: obj['userInfo'][i].user_email_id,
                //             batch: obj['userInfo'][i].user_batch,
                //             programme: obj['userInfo'][i].user_programme,
                //             mobileno: obj['userInfo'][i].user_adr_mobileno,
                //             address: obj['userInfo'][i].user_adr_line1 + ', ' + obj['userInfo'][i].user_adr_line2
                //                         + ', ' + obj['userInfo'][i].user_adr_line3
                //                         + ', ' + obj['userInfo'][i].user_adr_district
                //                         + ', ' + obj['userInfo'][i].user_adr_city
                //                         + ', ' + obj['userInfo'][i].user_adr_state
                //                         + ', ' + obj['userInfo'][i].user_adr_country
                //                         + ' - ' + obj['userInfo'][i].user_adr_pincode,
                //             telno: obj['userInfo'][i].user_adr_telno,
                //             personal_email_id : obj['userInfo'][i].user_adr_emailid,
                //             sex: obj['userInfo'][i].user_sex === 'M' ? "Male" : "Female",
                //             status: obj['userInfo'][i].user_status
                //         }
                //     }
                //     allUsers.push(userInfo);
                // }
                that.setState({
                    tableInfo: allUsers,
                    totalUsers: obj['userInfo'].length,
                    userInfo: obj['userInfo']
                })
            }
            unloadSpinner();
        };
        request.send();
    }

    toggleUserActiveStatus = (index) => {
        this.setState({
            showSpinner: true
        });
        const user = this.state.fetchedUser[index];
        const that = this;
        const url = domainUrl + '/user/changeStatus/' + user.daiictId;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const user = that.state.fetchedUser;
                user[index] = response.user;
                that.setState({
                    fetchedUser: user,
                    showSpinner: false
                });
            } else {
                handleError(request)
            }
        };
        request.send(JSON.stringify({isActive: !user.isActive}));
    };

    uploadHandler = (data) => {
        data = {
            "userInfo": data
        }
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/userInfo'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.setState({
                    showSpinner: false
                });
                that.props.alert.success("Data updated successfully!")
                setTimeout(function(){
                    window.location.reload()
                        }, 1800);
            }
            else {
                that.setState({
                    showSpinner: false
                });
                that.props.alert.error("Format issue: Please check the file again");
                setTimeout(function(){
                    window.location.reload()
                        }, 1800);

            }
        };
        request.send(JSON.stringify(data));
    }

    isExpandableRow() {
        return true;
    }

    expandComponent(row) {
        return (
            <BSTable data={row.expand}/>
        );
    }

    handleExportCSVButtonClick = (onClick) => {
        onClick();
    }
    createCustomExportCSVButton = (onClick) => {
        return (
            <ExportCSVButton
                btnText='Download CSV'
                btnContextual='btn-primary'
                className='my-custom-class'
                btnGlyphicon='fa fa-edit'
                onClick={e => this.handleExportCSVButtonClick(onClick)}/>
        );

    }

    onToggleDropDown = (toggleDropDown) => {
        toggleDropDown();
    }

    renderSizePerPageDropDown = (props) => {
        return (
            <SizePerPageDropDown
                className='my-size-per-page'
                btnContextual='btn-warning'
                variation='dropup'
                onClick={() => this.onToggleDropDown(props.toggleDropDown)}/>
        );
    }

    actionFormatter = (cell, row) => {
        const that = this;
        return <Switch
            handleClick={() => that.toggleUserActiveStatus(row.sr_no)}
            index={row.sr_no}
            isChecked={that.state.fetchedUser[row.sr_no].isActive ? true : false}
            message={modalMessages.userListSwitch} />;
    }

    render() {

        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)',
            exportCSVBtn: this.createCustomExportCSVButton,
            sizePerPageDropDown: this.renderSizePerPageDropDown
        };
        const defaultUserObj = {
            "user_inst_id": '',
            "user_type": '',
            "user_first_name": '',
            "user_middle_name": '',
            "user_last_name": '',
            "user_sex": '',
            "user_email_id": '',
            "user_status": '',
            "user_adr_contact_name": '',
            "user_adr_line1": '',
            "user_adr_line2": '',
            "user_adr_line3": '',
            "user_adr_city": '',
            "user_adr_district": '',
            "user_adr_state": '',
            "user_adr_country": '',
            "user_adr_pincode": '',
            "user_adr_telno": '',
            "user_adr_mobileno": '',
            "user_adr_emailid": '',
            "user_photo": '',
            "user_batch": '',
            "user_programme": ''
        }
        
        const tableInfo = _.map(this.state.tableInfo, (x) => {
            const o = Object.assign({}, defaultUserObj, x);
            return o;
        });

        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'User Management'}/>
                <div className={'d-flex justify-content-center mb-4'}>
                    <div class="card d-flex justify-content-center" style={{
                        width: "17em"
                    }}>
                        <div className="form-check form-check-inline" style={{marginLeft: "5%", marginBottom: "1%"}}>
                            <label className="form-check-label" style={{marginRight: "5%"}}>
                                <input className="form-check-input"
                                       style={{display: "inline"}}
                                       type="radio"
                                       value="registeredUsers"
                                       checked={this.state.userDataRecord === "registeredUsers"}
                                       onClick={() => {
                                           this.setState({userDataRecord: "registeredUsers"})
                                           var x = document.getElementById("registered");
                                           var y = document.getElementById("all");
                                           x.style.display = "block";
                                           y.style.display = "none";
                                       }}/>
                                Registered Users
                            </label>

                            <label className="form-check-label">
                                <input className="form-check-input"
                                       style={{display: "inline"}}
                                       type="radio"
                                       value="allUsers"
                                       checked={this.state.userDataRecord === "allUsers"}
                                       onClick={() => {
                                           this.setState({userDataRecord: "allUsers"})
                                           var x = document.getElementById("registered");
                                           var y = document.getElementById("all");
                                           x.style.display = "none";
                                           y.style.display = "block";
                                       }}/>
                                All Users
                            </label>
                        </div>
                    </div>
                </div>

                <div id="registered" style={{display: "block", paddingRight: "5%", paddingLeft: "5%"}}>
                    <BootstrapTable
                        data={this.state.user}
                        options={options}
                        expandableRow={this.isExpandableRow}
                        expandComponent={this.expandComponent}
                        search
                        headerStyle={{background: "#2b2b7b", color: "#fff"}}
                        pagination

                    >
                        <TableHeaderColumn dataField='sr_no' isKey={true} dataSort={true}
                                           thStyle={{textAlign: "center"}}>Sr. no</TableHeaderColumn>
                        <TableHeaderColumn dataField='id' dataSort={true} thStyle={{textAlign: "center"}}>User
                            ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name' dataSort={true} thStyle={{textAlign: "center"}}>User
                            Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='type' dataSort={true} thStyle={{textAlign: "center"}}>User
                            Type</TableHeaderColumn>
                        <TableHeaderColumn dataField='batch' dataSort={true} thStyle={{textAlign: "center"}}>User
                            Batch</TableHeaderColumn>
                        <TableHeaderColumn dataField='programme' dataSort={true} thStyle={{textAlign: "center"}}>User
                            Programme</TableHeaderColumn>
                        <TableHeaderColumn dataField="actions"
                                           dataFormat={this.actionFormatter}>Actions</TableHeaderColumn>
                    </BootstrapTable>                    
                </div>
                <div id="all" style={{display: "none", width: "200%", paddingLeft: "5%", paddingRight: "5%"}}>
                    <BootstrapTable
                        data={tableInfo}
                        options={options}
                        search
                        headerStyle={{background: "#2b2b7b", color: "#fff"}}
                        pagination
                        exportCSV
                    >
                        <TableHeaderColumn dataField='sr_no' isKey={true} dataSort={true}
                                           thStyle={{textAlign: "center"}}>Sr. no</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_inst_id' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_inst_id</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_type' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_type</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_first_name' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_first_name</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_middle_name' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_middle_name</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_last_name' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_last_name</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_sex' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_sex</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_email_id' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_email_id</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_status' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_status</TableHeaderColumn>

                        <TableHeaderColumn dataField='user_adr_contact_name' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_contact_name</TableHeaderColumn>

                        <TableHeaderColumn dataField='user_adr_line1' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_line1</TableHeaderColumn>

                        <TableHeaderColumn dataField='user_adr_line2' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_line2</TableHeaderColumn>

                        <TableHeaderColumn dataField='user_adr_line3' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_line3</TableHeaderColumn>

                        <TableHeaderColumn dataField='user_adr_district' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_district</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_state' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_state</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_country' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_country</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_pincode' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_pincode</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_telno' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_telno</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_mobileno' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_mobileno</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_adr_emailid' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_adr_emailid</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_batch' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_batch</TableHeaderColumn>
                        <TableHeaderColumn dataField='user_programme' dataSort={true}
                                           thStyle={{textAlign: "center"}}>user_programme</TableHeaderColumn>

                    </BootstrapTable>

                    
                    {/*dhaval-lila file upload starts here */}
                    <div className={'d-flex mt-4 mb-4'}>
                        <div class="card d-flex justify-content-center" style={{
                            width: "30em",
                            borderWidth: "3px"
                        }}>
                            <div class="card-body mx-auto">
                                <h5 class="card-title">Upload New User Data!</h5>
                                <h6 class="card-title">Allowed format: .xlsx (excel file) </h6>
                                <p class="card-text"><FileUpload handleSubmit={this.uploadHandler}/></p>
                            </div>
                        </div>
                    </div>
                    {/*dhaval-lila file upload ends here */}

                </div>
                <Spinner open={this.state.showSpinner}/>
            </React.Fragment>
        );
    }
}

export default withAlert(UserList);
