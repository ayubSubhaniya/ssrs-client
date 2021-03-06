import React, {PureComponent} from 'react'
import NavigationBar from "../NavigationBar";
import _ from 'lodash'
import Header from "../Header";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import {defaultEmails} from "../../constants/constants";
import {handleChange} from "../../helper/StateUpdate";
import RichTextEditor from 'react-rte';
import {withAlert} from "react-alert";

class Email extends PureComponent {
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
        const value = target.value;
        const email = this.state.emails[value];
        this.setState({
            selectedEmail: value,
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
            .then(() => {
                this.props.alert.success("Template updated successfully");
            })
            .catch((error) => handleError(error))
    }

    render() {
        const options = Object.keys(this.state.emails);
        return <div>
            <NavigationBar/>
            <Header title={'Email Templates'}/>
            <div className='container'>
                <div className="form-group row" style={{"marginTop": "5%"}}>
                    <label className="col-1.5 col-form-label form-control-lg">Template Name:</label>
                    <div className="col-4">
                        <select className="form-control form-control-lg" onChange={this.selectEmailType}
                                value={this.state.selectedEmail}>
                            {
                                _.map(options, (x) => {
                                    let y = this.state.emails[x]['templateName'];
                                    return <option key={x} value={x}>{y}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="modal-content" style={{"borderWidth": "2px"}}>
                    <div className="modal-body">
                        <form
                            autoComplete='off'
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.updateEmails();
                            }}
                            className="form-horizontal">
                            <div className="form-group row ml-0">
                                <label className="col-lg-1 col-form-label">Cc</label>
                                <div className="col-lg-11">
                                    <input type="text"
                                           value={this.state.cc}
                                           name={'cc'}
                                           placeholder={'Example: mail1, mail2, mail3'}
                                           onChange={this.handleChange}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row ml-0">
                                <label className="col-lg-1 col-form-label">Bcc</label>
                                <div className="col-lg-11">
                                    <input type="text"
                                           name={'bcc'}
                                           value={this.state.bcc}
                                           placeholder={'Example: mail1, mail2, mail3'}
                                           onChange={this.handleChange}
                                           className="form-control"/>
                                </div>
                            </div>
                            <hr style={{"borderWidth": "2px"}}/>
                            <div className="form-group row ml-0">
                                <label className="col-lg-1 col-form-label">Subject</label>
                                <div className="col-lg-11">
                                    <input type="text"
                                           name={'subject'}
                                           value={this.state.subject}
                                           onChange={this.handleChange}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row ml-0">
                                <label className="col-lg-1 col-form-label">Body</label>
                                <div className="col-lg-11">
                                    <RichTextEditor
                                        value={this.state.body}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-outline-success btn-lg"
                                        type="submit">Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default withAlert(Email)
