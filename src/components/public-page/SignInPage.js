import TextInputUserName from "./TextInputUserName";
import React from "react";
import {withRouter} from 'react-router-dom'
import ErrorMessage from "../error/ErrorMessage";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";
import Demo from '../../product_tour/Demo';
import Tour from "reactour";
import Text from "../../product_tour/Text";
import Tooltip from "../../product_tour/Tooltip";
import classes from '../../product_tour/styles.css'; 
import { Button, Link } from "../../product_tour/Button";

const bodyScrollLock = require('body-scroll-lock');

const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const targetElement = document.querySelector("body");
class SignInPage extends React.Component {
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
        const {daiictId, handleChange, password, loginMessage, logIn, openModal, clearLoginMessage} = this.props;
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
                      <i class="fa fa-question-circle"></i> Help !
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
                <div data-tut="reactour__positionID" >
                    <TextInputUserName daiictId={daiictId}
                                       handleChange={handleChange}/></div>
                    <div className="page-input" data-tut="reactour__positionPassword">
                        <div className="title"><i className="fa fa-lock"></i> PASSWORD
                        </div>
                        <input className="form-control" type="password" name="password" value={password}
                               onChange={handleChange}/>
                        <ErrorMessage message={loginMessage} clearMessage={clearLoginMessage}/>
                    </div>
                    <div className="page-input"><input type="submit" value="ENTER"/></div>
                    <input data-tut="reactour__positionForgetPassword" type="button" className={'page-link-cstm mt-2'} value="Forgot Password?"
                           onClick={openModal}/>
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
    
    {
      selector: '[data-tut="reactour__goTo"]',
      content: ({ goTo }) =>
        <div>
          Still having trouble
          <button
            style={{
              border: "1px solid #f7f7f7",
              background: "none",
              padding: ".3em .7em",
              fontSize: "inherit",
              display: "block",
              cursor: "pointer",
              margin: "1em auto"
            }}
            onClick={() => goTo(1)}
          >
            Please go back to 🚌
          </button>
        </div>
    },
    
    
  ];
export default withRouter(SignInPage)
