import TextInputUserName from "./TextInputUserName";
import React from "react";
import {withRouter} from 'react-router-dom'
import ErrorMessage from "../error/ErrorMessage";

class SignInPage extends React.Component {
    redirect = () => {
        if (this.props.location.state)
            this.props.history.push(this.props.location.state);
    }

    render() {
        const {daiictId, handleChange, password, loginMessage, logIn, openModal, clearLoginMessage} = this.props;
        return (
            <div className="page">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    logIn({
                        daiictId: daiictId,
                        password: password
                    }, this.redirect)
                }}>
                    <TextInputUserName daiictId={daiictId}
                                       handleChange={handleChange}/>
                    <div className="page-input">
                        <div className="title"><i className="fa fa-lock"></i> PASSWORD
                        </div>
                        <input className="form-control" type="password" name="password" value={password}
                               onChange={handleChange}/>
                        <ErrorMessage message={loginMessage} clearMessage={clearLoginMessage}/>
                    </div>
                    <div className="page-input"><input type="submit" value="ENTER"/></div>
                    <input type="button" className={'page-link-cstm mt-2'} value="Forgot Password?"
                           onClick={openModal}/>
                </form>
            </div>
        )
    }

}

export default withRouter(SignInPage)
