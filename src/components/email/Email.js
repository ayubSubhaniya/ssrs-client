import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from 'lodash'
import Header from "../Header";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import {defaultEmails} from "../../constants/constants";
import {handleChange} from "../../helper/StateUpdate";

class Email extends Component {
    constructor() {
        super();
        this.state = {
            emails: defaultEmails,
            body: '',
            cc: '',
            bcc: '',
            subject: '',
            selectedEmail: 'signUp'
        }
        this.handleChange = handleChange.bind(this);
    }

    componentDidMount() {
        this.getEmails();
    }

    trim(arr){
        return _.filter(_.map(arr, (x) => x.trim()), (x) => x);
    }

    selectEmailType = ({target}) => {
        const email = this.state.emails[target.value]
        this.setState({
            selectedEmail: target.value,
            body: email.body,
            cc: email.cc.join(', '),
            bcc: email.bcc.join(', '),
            subject: email.subject,
        })
    }

    getEmails = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/template/email'
        })
            .then((response) => {
                console.log(response);
                const email = response.template[this.state.selectedEmail];
                this.setState({
                    emails: response.template,
                    body: email.body,
                    cc: email.cc.join(", "),
                    bcc: email.bcc.join(", "),
                    subject: email.subject,
                })
            })
            .catch((error) => handleError(error))
    }

    getEmailFromState(){
        return {
            body: this.state.body,
            cc: this.trim(this.state.cc.split(',')),
            bcc: this.trim(this.state.bcc.split(',')),
            subject: this.state.subject
        }
    }

    updateEmails = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/template/email/' + this.state.selectedEmail,
            params: this.getEmailFromState()
        })
            .then((response) => {
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
                            <form role="form"
                                  autoComplete='off'
                                  onSubmit={(e) => {
                                      e.preventDefault();
                                      this.updateEmails();
                                  }}
                                  className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-lg-10 control-label">Cc (Enter email ids separated by ',')</label>
                                    <div className="col-lg-10">
                                        <input type="text"
                                               value={this.state.cc}
                                               name={'cc'}
                                               onChange={this.handleChange}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-10 control-label">Bcc (Enter email ids separated by ',')</label>
                                    <div className="col-lg-10">
                                        <input type="text"
                                               name={'bcc'}
                                               value={this.state.bcc}
                                               onChange={this.handleChange}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Subject</label>
                                    <div className="col-lg-10">
                                        <input type="text"
                                               name={'subject'}
                                               value={this.state.subject}
                                               onChange={this.handleChange}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label">Body</label>
                                    <div className="col-lg-10">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={this.state.body}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({
                                                    body: data
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-send"
                                        type="submit" >Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Email