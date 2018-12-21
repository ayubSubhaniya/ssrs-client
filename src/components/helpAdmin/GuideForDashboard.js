import React, {Component} from 'react';
import HrefComponent from './HrefComponent';

class GuideForDashboard extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For Dashboard</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Dashboard tab"
                                id = "collapseExample24"/>
                <div className="collapse" id = "collapseExample24">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-line-chart"></i> Dashboard" tab from Navigation bar, 
                                it shows two fragments named "Daily Statistics" and "Service Revenue". 
                                <br/>
                                <img src={require("./Dash1.JPG")} 
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                                In "Daily Statistics" fragment, you can see Total Payment, Online Payment,
                                Offline payment and total orders in the current day.
                            </li>
                            <li>
                                In "Service Revenue" fragment, you can see number of orders and total payment 
                                for a service in Left table (Columns are - Service Name | Quantity | Revenue).
                            </li>
                            <li>
                                In "Service Revenue" fragment, you can enter starting date and ending date to get
                                all Statistics in that interval for services in right layout 
                                (Columns are - Service Name | Quantity | Revenue). <br/>
                                <img src={require("./Dash2.JPG")} 
                                    style={{width:"40%", marginTop:"15px", marginBottom:"15px"}}></img> 
                                <img src={require("./Dash3.JPG")} 
                                    style={{width:"40%", marginTop:"15px", marginBottom:"15px", marginLeft:"5%"}}></img>                                    
                            </li>
                        </ol>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default GuideForDashboard;