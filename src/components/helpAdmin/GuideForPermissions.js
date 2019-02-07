import React, {PureComponent} from 'react';
import HrefComponent from './HrefComponent';

class GuideForPermissions extends PureComponent {

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Permission Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Permissions Tab"
                                id = "collapseExample22"/>
                <div className="collapse" id = "collapseExample22">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-lock"/> Permissions" tab from Navigation bar, 
                                list for all usertypes appear. 
                                <br/>
                                <img alt='' src={require("./Permissions0.JPG")}
                                    style={{width:"80%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                                There are 2 buttons for each user/admin type:<br/>
                                1) "Edit Permission (<i className="fa fa-edit"/>)" button - To edit all the permissions for 
                                a user/admin type. <br/>
                                2) "Delete User/Admin Type (<i className="fa fa-trash"/> - To delete user/admin type.
                                <br/>
                                <img alt='' src={require("./Permissions1.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>                            
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add user"
                                id = "collapseExample23"/>
                <div className="collapse" id = "collapseExample23">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on "Add New User" button. A modal will appear in which you can give name of new usertype. 
                                Same can be done for Admin types by pressing "Add new Admin" button.
                                <br/>
                                <img alt='' src={require("./Permissions2.JPG")}
                                    style={{width:"45%", marginTop:"15px", marginBottom:"15px"}}></img>  <br/> 
                                <img alt='' src={require("./Permissions3.JPG")}
                                    style={{width:"80%", marginTop:"15px", marginBottom:"15px"}}></img>                                                                      
                            </li>
                        </ol>
                    </div>
                </div>                                           
            </div>
        );
    }
}

export default GuideForPermissions;