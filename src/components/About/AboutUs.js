import React, {Component} from 'react';
import NavigationBar from '../NavigationBar';

class AboutUs extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <div class="container text-center">
                    <p style={{fontFamily:"Courier New", fontSize:"60px", color:"blue", marginTop:"2%"}}><strong>Meet the Team</strong></p>
                    <p style={{fontFamily:"Brush Script MT, cursive", fontSize:"50px", color:"red"}}><em><i>" None of us is as smart as all of us."</i></em></p>
                    <br/>
                    <div class="row">
                        <div class="col-sm-4">
                        <p style={{fontSize:"25px"}}><strong>Dhruv Patel</strong></p><br/>
                        <a>
                        <img src={require("./Dhruv.jpg")} className="person" alt="Random Name" width="256" height="256"/>
                        </a>
                        <div>
                            <p>Guitarist and Lead Vocalist</p>
                            <p>Loves long walks on the beach</p>
                            <p>Member since 1988</p>
                        </div>
                        {/* <img src={require("./Dhruv.jpg")} className="rounded-circle person" alt="Random Name" width="255" height="255"/> */}
                        {/* <div>
                            <p>Guitarist and Lead Vocalist</p>
                            <p>Loves long walks on the beach</p>
                            <p>Member since 1988</p>
                        </div> */}
                        </div>
                        <div class="col-sm-4">
                        <p style={{fontSize:"25px"}}><strong>Tapan Modi</strong></p><br/>
                        <img src={require("./dalogo.png")} alt="Random Name"/>
                        </div>
                        <div class="col-sm-4">
                        <p style={{fontSize:"25px"}}><strong>Ayub Subhaniya</strong></p><br/>
                        <img src={require("./dalogo.png")} alt="Random Name"/>
                        </div>
                    </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default AboutUs;