import React, {PureComponent} from 'react';
import HrefComponent from './HrefComponent';

class GuideForUsers extends PureComponent {

    render() {
        return (
            <div>
                <h2 style={{marginTop:"10px"}}> Guide For User Management</h2>
                <HrefComponent isToggle = {false}
                                name = "Introduction to Users tab"
                                id = "collapseExample12"/>
                <div className="collapse" id = "collapseExample12">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                When you click on the "<i className="fa fa-users"/> Users" tab from Navigation bar, 
                                the list of all the signed up 
                                users will appear. Each row represents entry for a praticular user. An user will be in the 
                                list if he had signed up earliar. 
                                There is a button given for each collection type: <br/>
                                1) Enable/Disable (<i className="fa fa-toggle-on"></i>) button - To enable/disable a User
                                <br/>
                                Another option is for uploading new user data into the database. Only those, who are added
                                in the database, are allowed to sign up. <br/>  
                                <img alt='' src={require("./Users1.JPG")}
                                    style={{width:"100%", marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>
                <HrefComponent isToggle = {false}
                                name = "Add new users"
                                id = "collapseExample14"/>
                <div className="collapse" id = "collapseExample14">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                At the bottom, there is a box, which is used for uploading new user data. First click on "Browse"
                                button. A modal will appear. Select your .xlsx (Microsoft excel) file by browsing your PC (Format
                                for Excel file is given in next subsection). Click 
                                on the "Open" button. <br/>
                                <img alt='' src={require("./Users4.JPG")}
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                            <li>
                            After that, modal will disappear. Now click on "Submit Query" button. This will upload you file and 
                            save all the details of new users in database so that these users can now register on the website.
                            For conformation you should get an alert saying "Data updated successfully". Otherwise you will 
                            receive an alert for errors.<br/>
                                <img alt='' src={require("./Users5.JPG")}
                                    style={{width:"45%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>   
                            
                            <li>
                            You can see all the added users and their details by clicking "All Users" radio button, below User Management Header.
                                <img alt='' src={require("./Users7.JPG")}
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img> 
                            </li>                           
                        </ol>
                    </div>
                </div> 
                <HrefComponent isToggle = {false}
                                name = "File Format for uploading New user data"
                                id = "collapseExample15"/>
                <div className="collapse" id = "collapseExample15">
                    <div className="card card-body" 
                        style={{marginLeft:"10px", marginRight:"10px", fontSize:"18px", background:"#e6f5fd"}}>
                        <ol style={{paddingLeft:"10px"}}>
                            <li>
                                In the excel file, following columns should be there. <br/>
                                user_inst_id	<br/>
                                user_type	<br/>
                                user_first_name	<br/>
                                user_middle_name	<br/>
                                user_last_name	<br/>
                                user_sex	<br/>
                                user_email_id	<br/>
                                user_status	<br/>
                                user_adr_contact_name<br/>	
                                user_adr_line1	<br/>
                                user_adr_line2	<br/>
                                user_adr_line3	<br/>
                                user_adr_city	<br/>
                                user_adr_district	<br/>
                                user_adr_state	<br/>
                                user_adr_country	<br/>
                                user_adr_pincode	<br/>
                                user_adr_telno	<br/>
                                user_adr_mobileno	<br/>
                                user_adr_emailid <br/>	
                                user_photo	<br/>
                                user_batch	<br/>
                                user_programme <br/>
                                <p><strong>Note:</strong> user_inst_id and user_email_id must be same</p> 
                                <img alt='' src={require("./Users6.JPG")}
                                    style={{width:"100%",marginTop:"15px", marginBottom:"15px"}}></img>
                            </li>
                        </ol>
                    </div>
                </div>                                
            </div>
        );
    }
}

export default GuideForUsers;