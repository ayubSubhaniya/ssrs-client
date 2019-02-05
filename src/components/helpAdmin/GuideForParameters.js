import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForParameters extends Component {

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Parameters</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Parameters tab"
                                id = "collapseExample6"/>
                <div className="collapse" id = "collapseExample6">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-cog"/> Paramters" tab from Navigation bar, the list 
                                of all the added 
                                Parameters will appear. Each row represents entry for a praticular Parameter. 
                                There are 3 buttons given for each Parameter: <br/>
                                1) Edit Service button - To edit a Parameter <br/>
                                2) Enable/Disable (<i className="fa fa-toggle-on"></i>) button - To enable/disable a Parameter<br/>
                                3) Delete Service button - To delete a Parameter
                                <br/>
                                <img alt='' src={require("./Parameters1.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add New Parameter"
                                id = "collapseExample7"/>
                <div className="collapse" id = "collapseExample7">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on "Add New Parameter" button. A form will appear in which you have to fill 
                                Parameter Name, Base Charge and description. Click on "Save" button to add new 
                                Parameter in the list.<br/>
                            </li>
                            <img alt='' src={require("./Parameters2.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img> <br/>
                            <img alt='' src={require("./Parameters3.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                    
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Edit Parameter"
                                id = "collapseExample8"/>
                <div className="collapse" id = "collapseExample8">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                In the "<i className="fa fa-cog"/> Parameters" tab, all the added parameters will be displayed. 
                                Click on the "edit parameter" (<i className="fa fa-pencil"></i>) 
                                button of the Parameter which you want to edit.<br/>
                            </li>
                            <li>
                                A form will appear filled with previous details. You can edit these details and save them.<br/>
                                <img alt='' src={require("./Parameters4.JPG")}
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                              
                        </ol>
                    </div>
                </div>                
            </div>
        );
    }
}

export default GuideForParameters;