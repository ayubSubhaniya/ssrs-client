import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import _ from 'lodash'
import Header from "../Header";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import {defaultEmails} from "../../constants/constants";
import {handleChange} from "../../helper/StateUpdate";
import RichTextEditor from 'react-rte';

class Email extends Component {
    constructor() {
        super();
        this.state = {
            emails: defaultEmails,
            body: RichTextEditor.createEmptyValue(),
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

    trim(arr) {
        return _.filter(_.map(arr, (x) => x.trim()), (x) => x);
    }

    selectEmailType = ({target}) => {
        const email = this.state.emails[target.value]
        this.setState({
            selectedEmail: target.value,
            body: RichTextEditor.createValueFromString(email.body, 'html'),
            cc: email.cc.join(', '),
            bcc: email.bcc.join(', '),
            subject: email.subject,
        })
    }

    onChange = (value) => {
        this.setState({body: value});
    };

    getEmails = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/template/email'
        })
            .then((response) => {
                const email = response.template[this.state.selectedEmail];
                this.setState({
                    emails: response.template,
                    body: RichTextEditor.createValueFromString(email.body, 'html'),
                    cc: email.cc.join(", "),
                    bcc: email.bcc.join(", "),
                    subject: email.subject,
                })
            })
            .catch((error) => handleError(error))
    }

    getEmailFromState() {
        return {
            body: this.state.body.toString('html'),
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
                alert("updated successfully");
            })
            .catch((error) => handleError(error))
    }

    render() {
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
                                    <label className="col-lg-10 control-label">Cc (Enter email ids separated by
                                        ',')</label>
                                    <div className="col-lg-10">
                                        <input type="text"
                                               value={this.state.cc}
                                               name={'cc'}
                                               onChange={this.handleChange}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-10 control-label">Bcc (Enter email ids separated by
                                        ',')</label>
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
                                        <RichTextEditor
                                            value={this.state.body}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-send"
                                        type="submit">Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Email
