import TextInputUserName from "./TextInputUserName";
import React from "react";

export default function SignInPage({daiictId, handleChange, password, loginMessage, logIn, openModal, clearLoginMessage}) {
    return (
        <div className="page">
            <TextInputUserName daiictId={daiictId}
                               handleChange={handleChange}/>
            <div className="page-input">
                <div className="title"><i className="material-icons">lock</i> PASSWORD
                </div>
                <input className="form-control" type="password" name="password" value={password}
                       onChange={handleChange}/>
                <div className={"alert alert-danger p-2 mt-2 mb-2" + (loginMessage ? '' : " d-none")}>
                    <button type="button" className="close" onClick={clearLoginMessage}>
                        &times;</button>
                    <strong>{loginMessage}</strong></div>
            </div>
            <div className="page-input"><input type="submit" value="ENTER"
                                               onClick={() => logIn({
                                                   daiictId: daiictId,
                                                   password: password
                                               })}/></div>
            <input type="button" className={'page-link-cstm'} value="Forgot Password"
                   onClick={openModal}/>
        </div>
    )
}
