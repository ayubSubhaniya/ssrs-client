import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GettingStarted extends Component {
    constructor(props, context) {
        super(props, context);
    }

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
                                <img id="SignUp1" src={require("./SignUp1.JPG")} ></img> 
                            </li>
                            <li>
                                Click on "Sign Me Up!" button. You will receive verification link on your webmail account.<br/>
                                <img id="SignUp2" src={require("./SignUp2.JPG")} ></img> 
                            </li>                                
                            <li>
                                Click on the verification link and you are good to go.
                                <img id="SignUp3" src={require("./SignUp3.JPG")} style={{marginTop:"15px", marginBottom:"15px"}}></img> 
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
                                <img id="LogIn1" src={require("./LogIn1.JPG")} ></img> 
                            </li>
                            <li>
                                Click on "Enter". If entered credentials are valid then homepage for admin will be opened.<br/>
                                <img src={require("./LogIn2.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                                
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Home Page"
                                id = "collapseExample0"/>
                <div className="collapse" id = "collapseExample0">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                There are 2 tabs on the homepage. First is Notification which shows all alert messages for Admin. 
                                Second is News which is displayed accross all Admins and users. It shows all updates about services.
                                <br/>
                                <img src={require("./Home1.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                                <img src={require("./Home2.JPG")} style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>                                 
                            </li>       
                        </ol>
                    </div>
                </div>                
            </div>
        );
    }
}

export default GettingStarted;