import TextInputUserName from "./TextInputUserName";
import React from "react";
import {withRouter} from 'react-router-dom'
import ErrorMessage from "../error/ErrorMessage";
import Tour from "reactour";
import Text from "../../product_tour/Text";
import classes from '../../product_tour/styles.css';
import {Button} from "../../product_tour/Button";

const bodyScrollLock = require('body-scroll-lock');

const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const targetElement = document.querySelector("body");

class SignInPage extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            isTourOpen: false
        }
    }

    redirect = () => {
        if (this.props.location.state)
            this.props.history.push(this.props.location.state);
    }
    closeTour = () => {
        this.setState({isTourOpen: false});
        enableBodyScroll(targetElement);
    };

    openTour = () => {
        this.setState({isTourOpen: true});
        disableBodyScroll(targetElement);

    };

    render() {
        const {isTourOpen} = this.state;
        const accentColor = '#5cb7b7';
        const {daiictId, handleChange, password, loginMessage, logIn, openModal, clearLoginMessage, showPassword, changePassworVisibility} = this.props;
        return (
            <div className="page">
                <Button h="4" onClick={this.openTour} style={{
                    position: 'fixed',
                    bottom: '2%',
                    right: '1%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    <i className="fa fa-question-circle"></i> Help !
                </Button>
                <Tour
                    onRequestClose={this.closeTour}
                    steps={tourConfig}
                    isOpen={isTourOpen}
                    maskClassName="mask"
                    className={classes.helper}
                    rounded={5}
                    accentColor={accentColor}
                    startAt={0}
                />
                <form onSubmit={(e) => {
                    e.preventDefault()
                    logIn({
                        daiictId: daiictId,
                        password: password
                    }, this.redirect)
                }}>
                    <div data-tut="reactour__positionID">
                        <TextInputUserName daiictId={daiictId}
                            handleChange={handleChange} /></div>
                    <div className="page-input" data-tut="reactour__positionPassword">
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

                        <ErrorMessage message={loginMessage} clearMessage={clearLoginMessage} />
                    </div>
                    <div className="page-input"><input type="submit" value="ENTER" /></div>
                    <input data-tut="reactour__positionForgetPassword" type="button" className={'page-link-cstm mt-2'}
                        value="Forgot Password?"
                        onClick={openModal} />
                </form>
            </div>
        )
    }

}

const tourConfig = [

    {
        selector: '[data-tut="reactour__positionID"]',
        content: () =>
            <Text>
                Only enter DA-IICT ID
            </Text>,
        position: "right"
    },
    {
        selector: '[data-tut="reactour__positionPassword"]',
        content: () =>
            <Text>
                Enter your password
            </Text>,
        position: "right"
    },
    {
        selector: '[data-tut="reactour__positionForgetPassword"]',
        content: () =>
            <Text>
                Click to reset account password
            </Text>,
        position: "right"
    },


];
export default withRouter(SignInPage)
