import React, {PureComponent} from 'react';
import HrefComponent from './HrefComponent';

class GuideForProfile extends PureComponent {

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Profile Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to My Profile tab"
                                id = "collapseExample16"/>
                <div className="collapse" id = "collapseExample16">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-user"/> My Profile" tab from Navigation bar, 
                                the Profile of user appears.
                                <br/>
                                <img alt='' src={require("./Profile1.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Edit Profile"
                                id = "collapseExample17"/>
                <div className="collapse" id = "collapseExample17">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on "Edit" button. A form will appear in which you can update your
                                profile. Click on "Save" button to save updated information.<br/>
                            </li>
                            <img alt='' src={require("./Profile2.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                        </ol>
                    </div>
                </div>               
            </div>
        );
    }
}

export default GuideForProfile;