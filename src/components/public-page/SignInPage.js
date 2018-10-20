import TextInputUserName from "./TextInputUserName";
import React from "react";
import ErrorMessage from "../error/ErrorMessage";

export default function SignInPage({ daiictId, handleChange, password, loginMessage, logIn, openModal, clearLoginMessage }) {
    return (
        <div className="page">
            <form onSubmit={(e) => {
                e.preventDefault()
                logIn({
                    daiictId: daiictId,
                    password: password
                })
            }}>
                <TextInputUserName daiictId={daiictId}
                    handleChange={handleChange} />
                <div className="page-input">
                    <div className="title"><i className="fa fa-lock"></i> PASSWORD
                    </div>
                    <input className="form-control" type="password" name="password" value={password}
                        onChange={handleChange} />
                    <ErrorMessage message={loginMessage} clearMessage={clearLoginMessage} />
                </div>
                <div className="page-input"><input type="submit" value="ENTER"
                    onClick={(e) => {
                        e.preventDefault()
                        logIn({
                            daiictId: daiictId,
                            password: password
                        })
                    }} /></div>
                <input type="button" className={'page-link-cstm'} value="Forgot Password"
                    onClick={openModal} />
            </form>
        </div>
    )
}
