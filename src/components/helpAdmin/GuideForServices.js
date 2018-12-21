import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForServices extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Service Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Service tab"
                                id = "collapseExample9"/>
                <div className="collapse" id = "collapseExample9">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-handshake-o"></i> Services" tab from Navigation bar, the list of all the added 
                                services will appear. Each row represents entry for a praticular service. 
                                There are 3 buttons given for each service: <br/>
                                1) Edit Service button - To edit a service <br/>
                                2) Enable/Disable (<i className="fa fa-toggle-on"></i>) button - To enable/disable a service for users<br/>
                                3) Delete Service (<i className="fa fa-trash-o"></i>) button - To delete a service
                                <br/>
                                <img src={require("./AddServices2.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add new Service"
                                id = "collapseExample10"/>
                <div className="collapse" id = "collapseExample10">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on the "Add New Service" button.<br/>
                            </li>
                            <li>
                                Now you have to fill following necessary details in the form<br/>
                                <img src={require("./AddServices1.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img> <br/>
                                Here you can do customizations also. For example, if you want to make a service available for
                                specific users, then you can select users programmwise or batchwise or by user type. <br/>
                                <img src={require("./AddServices3.JPG")} 
                                    style={{width:"45%", marginTop:"15px", marginBottom:"15px", marginRight:"5%"}}></img>
                                <img src={require("./AddServices4.JPG")} 
                                    style={{width:"45%", marginTop:"15px", marginBottom:"15px", marginRight:"5%"}}></img>                                    
                                <img src={require("./AddServices5.JPG")} 
                                    style={{width:"45%", marginTop:"15px", marginBottom:"15px", marginRight:"5%"}}></img>
                                <img src={require("./AddServices6.JPG")} 
                                    style={{width:"45%", marginTop:"15px", marginBottom:"15px", marginRight:"5%"}}></img>
                            </li>                                
                            <li>
                                Click on the "Save" button. You can see the list of all the added services.
                                <img src={require("./AddServices7.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Edit Service"
                                id = "collapseExample11"/>
                <div className="collapse" id = "collapseExample11">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                In the service tab, all the added services will be displayed. 
                                Click on the "edit service" (<i className="fa fa-pencil"></i>) 
                                button of the service which you want to edit.<br/>
                            </li>
                            <li>
                                A form will appear filled with previous details. You can edit these details and save them.<br/>
                                <img src={require("./EditServices1.JPG")} 
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                                
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default GuideForServices;