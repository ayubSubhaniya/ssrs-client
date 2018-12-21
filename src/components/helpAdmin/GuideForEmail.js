import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForEmail extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Email Template Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Email tab"
                                id = "collapseExample25"/>
                <div className="collapse" id = "collapseExample25">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-envelope"></i> Email" tab from Navigation bar, 
                                it will display current email template for actions which will be sent to the user after
                                completing these actions.
                                <br/>
                                <img src={require("./Email1.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                                In an email template, you can edit CC, Bcc, Subject, Body etc. In body, one
                                toolbar is given in which various text formats and alignment settings are given. 
                                You can see tooltip for a tool by hovering on it.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default GuideForEmail;