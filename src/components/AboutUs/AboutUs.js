import React, {PureComponent} from 'react';
import NavigationBar from "../NavigationBar";
import CoreDevs from './CoreDevs';
import SubDevs from './Subdevs';

const devs = new Array(6);
devs[0] = <CoreDevs name={"Sagar Savaliya"}
                designation={"Frontend Developer"}
                image_url={require("./Sagar.jpg")}
                batch={"2019"}
                facebook_url={"https://www.facebook.com/sagar.savaliya407"}
                github_url={"https://github.com/sagar-savaliya"}
                linkedin_url={"https://www.linkedin.com/in/sagar-savaliya-0825a3128/"} />
            
devs[1] = <CoreDevs name={"Ayub Subhaniya"}
                designation={"Backend Developer"}
                image_url={require("./Ayub.jpg")}
                batch={"2019"}
                facebook_url={"https://www.facebook.com/ayub.subhaniya"}
                github_url={"https://github.com/ayubSubhaniya"}
                linkedin_url={"https://www.linkedin.com/in/ayub-subhaniya-7632a4112/"}
                googleplus_url={"https://plus.google.com/101960984824622972479"} />

devs[2] = <CoreDevs name={"Tapan Modi"}
                designation={"Frontend Developer"}
                image_url={require("./Tapan.jpg")}
                batch={"2019"}
                facebook_url={"https://www.facebook.com/tapanr97"}
                github_url={"https://github.com/tapanr97"}
                linkedin_url={"https://www.linkedin.com/in/tapan-modi-aa420571/"}
                googleplus_url={"https://plus.google.com/+TapanModi"} />

devs[3] = <CoreDevs name={"Dhaval Lila"}
                designation={"Frontend Developer"}
                image_url={require("./Dhaval.jpg")}
                batch={"2019"}
                facebook_url={"https://www.facebook.com/dhavaljlila"}
                github_url={"https://github.com/DhavalLila"}
                linkedin_url={"https://www.linkedin.com/in/dhaval-lila-822895163/"} />

devs[4] = <CoreDevs name={"Harsh Vasoya"}
                designation={"Fullstack Developer"}
                image_url={require("./Harsh.JPG")}
                batch={"2019"}
                github_url={"https://github.com/harshvasoya008"}
                linkedin_url={"https://www.linkedin.com/in/harsh-vasoya-463828160/"} />

devs[5] = <CoreDevs name={"Dhruv Patel"}
                designation={"Frontend Developer"}
                image_url={require("./Dhruv.jpg")}
                batch={"2019"}
                facebook_url={"https://www.facebook.com/profile.php?id=100009951722951"}
                github_url={"https://github.com/pdhruv1109"}
                linkedin_url={"https://www.linkedin.com/in/dhruv-patel-aa8522125/"} />

const subdevs_data = [
    {"name": "Hardik Chhatrala", "batch": "2020", "contribution": "Backend development"},
    {"name": "Jaimin Chaudhary", "batch": "2020", "contribution": "Backend development"},
    {"name": "Pankil Panchal", "batch": "2020", "contribution": "Frontend development"},
    {"name": "Jeet Patel", "batch": "2020", "contribution": "Frontend development"},
    {"name": "Yash Kothari", "batch": "2019", "contribution": "UI fixes and Alpha testing"}
]

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

function GetCoreDevs() {
    return devs;
}

function GetSubDevs() {
    let rendered_data_list = [];
    subdevs_data.forEach(element => {
        const rendered_data = <SubDevs data={element} />
        rendered_data_list.push(rendered_data);    
    });
    return rendered_data_list;
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
            <React.Fragment>
                <NavigationBar />
                <div className="aboutus-main">
                    <div className="about-us-header-overlay">
                        <img alt='' src={require('./group_img.jpg')} style={{ width: "100%" }} />
                        <div className="about-us-header">
                            <span>Meet the Team</span>
                        </div>
                    </div>
                    <div className="row about-us-body" style={{ marginLeft: "0%", marginRight: "0%", paddingTop: "40px" }}>
                        <GetCoreDevs />
                    </div>
                    <div className="about-us-footer-overlay">
                        <div className="about-us-footer">
                            <h1>Valuable contributions</h1>
                            <div className="other-contribution">
                                <GetSubDevs />
                            </div>
                            <h2>
                                "None of us is as smart as all of us..." <br />
                                - Ken H. Blanchard
                        </h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutUs; 