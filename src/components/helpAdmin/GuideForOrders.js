import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForOrders extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Order Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to All orders tab"
                                id = "collapseExample18"/>
                <div className="collapse" id = "collapseExample18">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-list-ul"/> All Orders" tab from Navigation bar, 
                                list of all orders appear. Each order may have different status like Placed, Processing, Ready To 
                                Deliver, Ready to Pickup etc. So there is a filter to fetch only specific subset of orders according 
                                to their status.
                                <br/>
                                <img src={require("./Orders1.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Stages of a Order"
                                id = "collapseExample19"/>
                <div className="collapse" id = "collapseExample19">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on an order, all details are shown e.g. Order number, Status, Total Payable Amount
                                Collection Information etc.<br/>
                                <img src={require("./Orders2.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                            </li>
                            <li>
                                Addressbar is to track the order. You (as an admin) can change status according to situations.
                                In above example, when you click on "Accept Payment", it shows that payment is received and
                                Order is in "Processing" stage.  <br/>
                                <img src={require("./Orders3.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                            </li>                            
                            <li>
                                Here you have several Options: <br/>
                                <ul style={{paddingLeft:"10px"}}>
                                    <li>When the requested document is ready, you can change status to "Ready To Pickup"
                                            by clicking on "Ready" button in the status column.
                                    </li>
                                    <li> Suppose all the information is not given for an order, so you can press "Hold" button 
                                        so that user can edit that order and update info. After pressing "Hold", you give reason
                                        for holding, which will be sent as notification to user. Now user can edit his order and 
                                        correct his info.
                                        <img src={require("./Orders7.JPG")} 
                                            style={{width:"50%", marginTop:"15px", marginBottom:"15px"}}></img> 
                                    </li>
                                    <li> If order is not valid or for some other reason, you can cancel an order by pressing 
                                        "Cancel" button.
                                        <img src={require("./Orders8.JPG")} 
                                            style={{width:"50%", marginTop:"15px", marginBottom:"15px"}}></img>
                                    </li>
                                </ul>
                                <img src={require("./Orders4.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                            </li>                                                        
                            <li>
                                When user picks up his order, process is completed and so you can click on "Complete" button
                                under Completed stage.<br/>
                                <img src={require("./Orders5.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                            </li>
                            <li>
                                Since this order is completed, its status is changed to "Completed". You can check it by filter 
                                orders by "Completed" stage.<br/>
                                <img src={require("./Orders6.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>                                  
                            </li>                            
                        </ol>
                    </div>
                </div>               
            </div>
        );
    }
}

export default GuideForOrders;