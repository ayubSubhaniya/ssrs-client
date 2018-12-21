import TextInputUserName from "./TextInputUserName";
import React,{Component} from "react";
import ErrorMessage from "../error/ErrorMessage";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";
import Demo from '../../product_tour/Demo';
import Tour from 'reactour';
import Text from "../../product_tour/Text";
import Tooltip from "../../product_tour/Tooltip";
import classes from '../../product_tour/styles.css'; 
import { Button, Link } from "../../product_tour/Button";
const bodyScrollLock = require('body-scroll-lock');

const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const targetElement = document.querySelector("body");

class SignUpPage extends React.Component{
    constructor() {
        super();
        this.state = {
            isTourOpen: false
        }
    }
    closeTour = () => {
        this.setState({ isTourOpen: false });
        enableBodyScroll(targetElement);
    };
    
    openTour = () => {
        this.setState({ isTourOpen: true });
        disableBodyScroll(targetElement);

    };
    render() {  
    const { isTourOpen } = this.state;

    const accentColor = '#5cb7b7';
    const {daiictId,password, showPassword, isSignedup,handleResendVerificationLink,
    changePassworVisibility,signupMessage,clearSignupMessage,handleSignUp, 
    handleChange} = this.props;
    return (
        
        <div className="page signup">
            <Button h="4" onClick={this.openTour} style={{
                position: 'fixed',
                bottom: '2%',
                right: '-100%',
                background: 'rgba(0, 0, 0, 0.5)',
                fontWeight: 'bold', 
                color: 'white'
                
            }}>
               
      <i class="fa fa-question-circle"></i> Help !

            </Button>
            <Tour
                onRequestClose={this.closeTour}
                steps={tourConfig1}
                isOpen={isTourOpen}
                maskClassName="mask"
                startAt={0}
                className={classes.helper}
                rounded={5}
                accentColor={accentColor}
                />
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSignUp()
            }}>
         <div data-tut="reactour__positionID1" >
                <TextInputUserName daiictId={daiictId}
                    handleChange={handleChange} /> </div>
                <div className="page-input" data-tut="reactour__positionPassword1">
                    <div className="title" ><i className="fa fa-lock"></i> PASSWORD
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
                   <ErrorMessage  message={signupMessage} clearMessage={clearSignupMessage}  />
                </div>
                <div className="page-input" data-tut="reactour__positionButton1"><input type="submit" value="SIGN ME UP!"
                    onClick={(e) => {
                        e.preventDefault()
                        handleSignUp()
                    }} /></div>
                <div className={'alert alert-success p-2 mt-2 mb-2' + (isSignedup ? '' : ' d-none')}>
                    <span className={"alert-link"}
                        style={{ "cursor": "pointer" }}
                        onClick={handleResendVerificationLink}> Resend Link
                    </span>
                </div>
            </form>
        </div>
    )
    }
}
const tourConfig1 = [

    {
        selector: '[data-tut="reactour__positionID1"]',
        content: () =>
          <Text>
              Only enter DA-IICT ID
          </Text>,
        position: "right"
    },
    {
        selector: '[data-tut="reactour__positionPassword1"]',
        content: () =>
        <Text>
            Enter your password
        </Text>,
        position: "right"
    },
    {
        selector: '[data-tut="reactour__positionButton1"]',
        content: () =>
        <Text>
            Click Me !
        </Text>,
        position: "right"
    },
    {
        selector: '[data-tut="reactour__position1"]',
        content: () =>
        <Text>
            Please confirm your account by verifying link sent to your webmail account.
            <br/>
            Then SignIn with your DA-IICT ID.
        </Text>,
        position: "right"
    },    
    
  ];
export function closeTour(isTourOpen){
    isTourOpen=false ;
    enableBodyScroll(targetElement);
};

export function openTour(isTourOpen){
    isTourOpen =true;
    disableBodyScroll(targetElement);

};
export default SignUpPage;