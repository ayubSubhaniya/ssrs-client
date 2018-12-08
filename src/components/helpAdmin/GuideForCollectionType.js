import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForCollectionType extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Collection Type</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to CollectionType tab"
                                id = "collapseExample3"/>
                <div className="collapse" id = "collapseExample3">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-archive"/> CollectionTypes" tab from Navigation bar, the list of all the added 
                                Collection Types will appear. Each row represents entry for a praticular collection Type. 
                                There are 3 buttons given for each collection type: <br/>
                                1) Edit Service button - To edit a Collection Type <br/>
                                2) Enable/Disable (<i className="fa fa-toggle-on"></i>) button - To enable/disable a Collection Type for users<br/>
                                3) Delete Service button - To delete a Collection Type
                                <br/>
                                <img src={require("./CollectionType1.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add New Collection Type"
                                id = "collapseExample4"/>
                <div className="collapse" id = "collapseExample4">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on "Add New CollectionType" button. A form will appear in which you have to fill 
                                CollectionType Name, Base Charge and description. Click on "Save" button to add new 
                                Collection Type in the list.<br/>
                            </li>
                            <img src={require("./CollectionType2.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Edit Collection Type"
                                id = "collapseExample5"/>
                <div className="collapse" id = "collapseExample5">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                In the CollectionType tab, all the added collectionType will be displayed. 
                                Click on the "edit collectionType" (<i className="fa fa-pencil"></i>) 
                                button of the collectionType which you want to edit.<br/>
                            </li>
                            <li>
                                A form will appear filled with previous details. You can edit these details and save them.<br/>
                                <img src={require("./CollectionType3.JPG")} 
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                              
                        </ol>
                    </div>
                </div>                
            </div>
        );
    }
}

export default GuideForCollectionType;