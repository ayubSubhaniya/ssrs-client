import React, {PureComponent} from 'react';
import HrefComponent from './HrefComponent';

class GettingUserStarted extends PureComponent {

    render() {
        return (
            <div>
                <h2> Getting Started</h2>
                <HrefComponent isToggle = {false}
                                name = "Sign Up"
                                id = "collapseExample1"/>
                <div className="collapse" id = "collapseExample1">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Enter User Name and Password in respective fields.<br/>
                                <img alt='' src={require("./SignUp1.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                                Click on "Sign Me Up!" button. You will receive verification link on your webmail account.<br/>
                                <img alt='' src={require("./SignUp2.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>                                
                            <li>
                                Click on the verification link and you are good to go.
                                <img alt='' src={require("./SignUp3.JPG")} style={{marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Log In"
                                id = "collapseExample2"/>
                <div className="collapse" id = "collapseExample2">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Enter User Name and Password in respective fields.<br/>
                                <img alt='' src={require("./LogIn1.JPG")} style={{marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                                Click on "Enter". If entered credentials are valid then homepage for Users will be opened.<br/>
                                <img alt='' src={require("./LogIn2.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>                                
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default GettingUserStarted;