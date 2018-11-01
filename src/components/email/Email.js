import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from 'lodash'
import Header from "../Header";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

class Email extends Component {
    constructor() {
        super();
        this.state = {
            emails: {
                "signUp": {
                    "templateId": "5bhfnj67kcndhrknz25gdhctn",
                    "templateName": "Sign up",
                    "subject": "Verify your Email account",
                    "cc": [],
                    "bcc": [],
                    "body": "Welcome to Student Service Request System - DAIICT! <br><br> Please click on the below mentioned link to verify your email."
                },
                "forgetPassword": {
                    "templateId": "6bhjnkolcdswxlz85co4h7c2b0p",
                    "templateName": "Forget Password",
                    "subject": "Password Reset Link",
                    "cc": [],
                    "bcc": [],
                    "body": "Hello, <br>Please click on the link below to reset your password."
                },
                "passwordChanged": {
                    "templateId": "c8ks30lck7cjkrknz25c4l0dh",
                    "templateName": "Password successfully changed",
                    "subject": "Password successfully changed",
                    "cc": [],
                    "bcc": [],
                    "body": "Hello,\n \tThis is a confirmation mail for successful change in password for your account - "
                }
            },
            selectedEmail: 'signUp'
        }
    }

    componentDidMount() {
        // this.getEmails();
    }

    selectEmailType = ({target}) => {
        this.setState({
            selectedEmail: target.value
        })
    }

    getEmails = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/template/email'
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    emails: response.template
                })
            })
            .catch((error) => handleError(error))
    }

    updateEmails = (updateTemplate) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/template/email',
            params: updateTemplate
        })
            .then((response) => {
                console.log(response);
                const emails = this.state.emails;
                emails[this.state.selectedEmail] = updateTemplate;
                this.setState({
                    emails: emails
                })
            })
            .catch((error) => handleError(error))
    }

    render() {
        const email = this.state.emails[this.state.selectedEmail];
        return (
            <div>
                <NavigationBar/>
                <Header title={'Email Templates'}/>
                <div className='container'>
                    <div className="form-group row">
                        <label className="col-1 col-form-label">Email</label>
                        <div className="col-4">
                            <select className="form-control" onClick={this.selectEmailType}>
                                <option hidden>{this.state.selectedEmail}</option>
                                {
                                    _.map(Object.keys(this.state.emails), (x, i) => {
                                        return <option key={i} value={x}>{x}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body">
                            <form role="form" className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">To</label>
                                    <div className="col-lg-10">
                                        <input type="text" placeholder="" id="inputEmail1"
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Cc / Bcc</label>
                                    <div className="col-lg-10">
                                        <input type="text" placeholder="" id="cc" className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Subject</label>
                                    <div className="col-lg-10">
                                        <input type="text" placeholder="" id="inputPassword1"
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Body</label>
                                    <div className="col-lg-10">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={email.body}
                                            onInit={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Email Templacte Here!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({event, editor, data});
                                            }}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-send" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Email
