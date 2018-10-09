import TextInputUserName from "./TextInputUserName";
import React from "react";
import ErrorMessage from "../error/ErrorMessage";

export default function SignUpPage({
    daiictId,
    password,
    showPassword,
    handleChange,
    changePassworVisibility,
    signupMessage,
    clearSignupMessage,
    handleSignUp,
    isSignedup,
    handleResendVerificationLink
}) {
    return (
        <div className="page signup">
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSignUp()
            }}>
                <TextInputUserName daiictId={daiictId}
                    handleChange={handleChange} />
                <div className="page-input">
                    <div className="title"><i className="fa fa-lock"></i> PASSWORD
                </div>
                    <div className="input-group mb-3">
                        <input type={showPassword ? "text" : "password"}
                            className="form-control"
                            aria-label="password"
                            value={password}
                            onChange={handleChange}
                            name="password"
                            aria-describedby="basic-addon" />
                        <div className="input-group-append">
                            <span className="input-group-text"
                                id="basic-addon">
                                <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                    style={{ "cursor": "pointer", "fontSize": "1.6rem" }}
                                    onClick={changePassworVisibility}></i>
                            </span>
                        </div>
                    </div>
                    <ErrorMessage message={signupMessage} clearMessage={clearSignupMessage} />
                </div>
                <div className="page-input"><input type="submit" value="SIGN ME UP!"
                    onClick={handleSignUp} /></div>
                <div className={'alert alert-success p-2 mt-2 mb-2' + (isSignedup ? '' : ' d-none')}>
                    <strong>Verification Link Sent!</strong>
                    <span className={"alert-link"}
                        style={{ "cursor": "pointer" }}
                        onClick={handleResendVerificationLink}> Resend
                                                </span>
                </div>
            </form>
        </div>
    )
}
