import React, {PureComponent} from 'react';
import Devs from './Devs';

const devs = new Array(6);
devs[0] = <Devs name={"Sagar Savaliya"}
                designation={"Front-End Developer"}
                image_url={require("./Sagar.jpg")}
                batch={"2015"}
                facebook_url={"https://www.facebook.com/sagar.savaliya407"}
                github_url={"https://github.com/sagar-savaliya"}
                linkedin_url={"https://www.linkedin.com/in/sagar-savaliya-0825a3128/"} />
            
devs[1] = <Devs name={"Ayub Subhaniya"}
                designation={"Back-End Developer"}
                image_url={require("./Ayub.jpg")}
                batch={"2015"}
                facebook_url={"https://www.facebook.com/ayub.subhaniya"}
                github_url={"https://github.com/ayubSubhaniya"}
                linkedin_url={"https://www.linkedin.com/in/ayub-subhaniya-7632a4112/"}
                googleplus_url={"https://plus.google.com/101960984824622972479"} />

devs[2] = <Devs name={"Tapan Modi"}
                designation={"Front-End Developer"}
                image_url={require("./Tapan.jpg")}
                batch={"2015"}
                facebook_url={"https://www.facebook.com/tapanr97"}
                github_url={"https://github.com/tapanr97"}
                linkedin_url={"https://www.linkedin.com/in/tapan-modi-aa420571/"}
                googleplus_url={"https://plus.google.com/+TapanModi"} />

devs[3] = <Devs name={"Dhaval Lila"}
                designation={"Front-End Developer"}
                image_url={require("./Dhaval.jpg")}
                batch={"2015"}
                facebook_url={"https://www.facebook.com/dhavaljlila"}
                github_url={"https://github.com/DhavalLila"}
                linkedin_url={"https://www.linkedin.com/in/dhaval-lila-822895163/"} />

devs[4] = <Devs name={"Harsh Vasoya"}
                designation={"Back-End Developer"}
                image_url={require("./Harsh.JPG")}
                batch={"2015"}
                github_url={"https://github.com/harshvasoya008"}
                linkedin_url={"https://www.linkedin.com/in/harsh-vasoya-463828160/"} />

devs[5] = <Devs name={"Dhruv Patel"}
                designation={"Front-End Developer"}
                image_url={require("./Dhruv.jpg")}
                batch={"2015"}
                facebook_url={"https://www.facebook.com/profile.php?id=100009951722951"}
                github_url={"https://github.com/pdhruv1109"}
                linkedin_url={"https://www.linkedin.com/in/dhruv-patel-aa8522125/"} />

function shuffle() {
    var ctr = devs.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = devs[ctr];
        devs[ctr] = devs[index];
        devs[index] = temp;
    }
}

function ShowDevs() {
    return devs;
}

class AboutUs extends PureComponent {

    componentWillMount() {
        shuffle();
    }

    goBack = () => {
        window.history.back()
    }

    render() {

        return (
            <div>
                <div style={{background: "#333"}}>
                    <button className="btn btn-outline-light btn-lg" onClick={this.goBack}
                            style={{marginLeft: "1%", marginTop: "1%"}}>
                        <i className="fa fa-hand-o-left" style={{marginRight: "5px"}}/>Back
                    </button>
                    <h1 className="my-header deepshadow" style={{textAlign: "center"}}>Meet Our Team<br/>
                        <h2 className="my-header2"><span style={{color: "red"}}>"</span>None Of Us Is As Smart As All Of
                            Us<span style={{color: "red"}}>"</span></h2></h1>
                </div>
                <img alt='' src={require('./group1_1.jpg')} style={{width: "100%"}}/>
                <div className="row about-back" style={{marginLeft: "0%", marginRight: "0%", paddingTop: "40px"}}>
                    <ShowDevs/>
                </div>
            </div>
        );
    }
}

export default AboutUs; 