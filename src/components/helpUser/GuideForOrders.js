import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForOrders extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Orders</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Service tab"
                                id = "collapseExample6"/>
                <div className="collapse" id = "collapseExample6">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "Services" tab from Navigation bar, the list of all the added 
                                services will appear. Each row represents a praticular service. 
                                If you want to apply for any service click on apply button: <br/>
                                <img src={require("./Order1.png")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add Service details"
                                id = "collapseExample7"/>
                <div className="collapse" id = "collapseExample7">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                Click on the "Apply" button.<br/>
                            </li>
                            <li>
                                Now you have to fill following necessary Service details in the form<br/> 
                            </li>                                
                            <li>
                                Click on the "Add to cart" button.
                                <img src={require("./Order2.png")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Cart"
                                id = "collapseExample8"/>
                <div className="collapse" id = "collapseExample8">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                In the Cart tab, all the added services will be displayed. 
                                Click on the "checkout" for placing order.
                                <img src={require("./Cart1.png")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>
                            <li>
                                Select the Collection Type. If courier is selected then select address or add address. Then select place order.<br/>
                                <img src={require("./Cart2.png")} 
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>
                            <li>
                                Select the Payment method and pay.<br/>
                                <img src={require("./Cart3.png")} 
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                                
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default GuideForOrders;