import React, {PureComponent} from 'react';

const devs = new Array(6);
devs[0] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Sagar.jpg")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Sagar Savaliya
        </h3>
        <hr class="style14"></hr>
        <p>Front-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>
        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sagar.savaliya407"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/sagar-savaliya"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sagar-savaliya-0825a3128/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
        </div>
    </div>
)

devs[1] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Ayub.jpg")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Ayub Subhaniya
        </h3>
        <hr class="style14"></hr>
        <p>Back-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>

        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ayub.subhaniya"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayubSubhaniya"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ayub-subhaniya-7632a4112/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://plus.google.com/101960984824622972479"><i
                class="fa fa-3x fa-google-plus"></i></a>
        </div>
    </div>
)

devs[2] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Tapan.jpg")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Tapan Modi
        </h3>
        <hr class="style14"></hr>
        <p>Front-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>

        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/tapanr97"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/tapanr97"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tapan-modi-aa420571/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://plus.google.com/+TapanModi"><i
                class="fa fa-3x fa-google-plus"></i></a>
        </div>
    </div>
)

devs[3] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Dhaval.jpg")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Dhaval Lila
        </h3>
        <hr class="style14"></hr>
        <p>Front-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>
        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/dhavaljlila"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/DhavalLila"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dhaval-lila-822895163/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
        </div>
    </div>
)

devs[4] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Harsh.JPG")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Harsh Vasoya
        </h3>
        <hr class="style14"></hr>
        <p>Back-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>
        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/harsh.vasoya.083"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/harshvasoya008"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/harsh-vasoya-463828160/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
        </div>
    </div>
)

devs[5] = (
    <div class="col-lg-4 col-sm-6 text-center mb-4">
        <img class="rounded-circle img-fluid d-block mx-auto" src={require("./Dhruv.jpg")} alt=""
             style={{width: "200px", height: "200px"}}/>
        <h3 style={{color: "#e50202", marginTop: "2%"}}>Dhruv Patel
        </h3>
        <hr class="style14"></hr>
        <p>Front-End Developer</p>
        <p>Batch-2015</p>
        <hr class="style14"></hr>
        <div class="wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=100009951722951"><i
                class="fa fa-3x fa-facebook-square"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/pdhruv1109"><i
                class="fa fa-3x fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dhruv-patel-aa8522125/"><i
                class="fa fa-3x fa-linkedin-square"></i></a>
        </div>
    </div>
)

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
                    <button className="btn btn-outline-primary" onClick={this.goBack}
                            style={{marginLeft: "1%", marginTop: "1%"}}>
                        <i className="fa fa-hand-o-left" style={{marginRight: "5px"}}/>Back
                    </button>
                    <h1 class="my-header deepshadow" style={{textAlign: "center"}}>Meet Our Team<br/>
                        <h2 class="my-header2"><span style={{color: "red"}}>"</span>None Of Us Is As Smart As All Of
                            Us<span style={{color: "red"}}>"</span></h2></h1>
                </div>
                <img alt='' src={require('./group1_1.jpg')} style={{width: "100%"}}/>
                <div class="row about-back" style={{marginLeft: "0%", marginRight: "0.2%", paddingTop: "40px"}}>
                    <ShowDevs/>
                </div>
            </div>
        );
    }
}

export default AboutUs; 