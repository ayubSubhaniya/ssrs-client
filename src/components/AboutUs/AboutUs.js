import React, {Component} from 'react';
import NavigationBar from '../NavigationBar';
import { SocialIcon } from 'react-social-icons';

class AboutUs extends Component{
    constructor(props, context) {
        super(props,context);
    }

    render() {
        return(
            <div>
                <NavigationBar/>
                <div>    
                    <h1 class="my-header deepshadow" style={{textAlign:"center"}}>Meet Our Team<br/>                    
                    <h2 class="my-header2"><span style={{color:"red"}}>"</span>None Of Us Is As Smart As All Of Us<span style={{color:"red"}}>"</span></h2></h1>

                    <img src={require('./group1_1.jpg')} style={{width:"100%"}}/>
                    <div class="row about-back" style={{marginLeft:"0%", marginRight:"0.2%",paddingTop:"40px"}}>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Sagar.jpg")} alt=""
                                style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202", marginTop:"2%"}}>Sagar Savaliya
                            </h3>
                            <hr class="style14"></hr>
                            <p>Front-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>Intern & FTE At Sprinklr</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/sagar.savaliya407" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/>
                            <SocialIcon url="https://www.linkedin.com/in/sagar-savaliya-0825a3128/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/>
                        </div>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Ayub.jpg")} alt=""
                                    style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202",marginTop:"2%"}}>Ayub Subhaniya
                            </h3>
                            <hr class="style14"></hr>
                            <p>Back-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>Intern & FTE At Sprinklr</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/ayub.subhaniya" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/>
                            <SocialIcon url="https://www.linkedin.com/in/ayub-subhaniya-7632a4112/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/>
                        </div>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Tapan.jpg")} alt=""
                                        style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202",marginTop:"2%"}}>Tapan Modi
                            </h3>
                            <hr class="style14"></hr>
                            <p>Front-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>Intern & FTE At Goldman Sachs</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/tapanr97" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/> 
                            <SocialIcon url="https://plus.google.com/+TapanModi" 
                                        style={{height:"40px", width:"40px", marginRight:"2%",marginBottom:"40px"}}/> 
                            <SocialIcon url="https://www.linkedin.com/in/tapan-modi-aa420571/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/> 
                        </div>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Dhruv.jpg")} alt=""
                                        style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202",marginTop:"2%"}}>Dhruv Patel
                            </h3>
                            <hr class="style14"></hr>
                            <p>Front-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>FTE At Oracle</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/profile.php?id=100009951722951" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/>
                            <SocialIcon url="https://www.linkedin.com/in/dhruv-patel-aa8522125/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/> 
                        </div>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Harsh.JPG")} alt=""
                                        style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202",marginTop:"2%"}}>Harsh Vasoya
                            </h3>
                            <hr class="style14"></hr>
                            <p>Back-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>Intern At Prop-Tiger</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/harsh.vasoya.083" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/>
                            <SocialIcon url="https://www.linkedin.com/in/harsh-vasoya-463828160/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/>
                        </div>
                        <div class="col-lg-4 col-sm-6 text-center mb-4">
                            <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Dhaval.jpg")} alt=""
                                        style={{width:"200px", height:"200px"}}/>
                            <h3 style={{color:"#e50202",marginTop:"2%"}}>Dhaval Lila
                            </h3>               
                            <hr class="style14"></hr>          
                            <p>Front-End Developer</p>
                            <p>Competitive Programmer</p>
                            <p>Intern At Sprinklr</p>
                            <p>FTE At Amadeus Labs</p>
                            <hr class="style14"></hr>
                            <SocialIcon url="https://www.facebook.com/dhavaljlila" 
                                        style={{height:"40px", width:"40px", marginRight:"2%", marginBottom:"40px"}}/>
                            <SocialIcon url="https://www.linkedin.com/in/dhaval-lila-822895163/" 
                                        style={{height:"40px", width:"40px",marginBottom:"40px"}}/>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}

export default AboutUs; 