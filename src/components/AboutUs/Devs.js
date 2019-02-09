import React, {PureComponent} from 'react';

class Devs extends PureComponent {
    render() {
        const {image_url, name, designation, batch} = this.props;
        const {facebook_url, github_url, linkedin_url, googleplus_url} = this.props;

        return (
            <div class="col-lg-4 col-sm-6 text-center">
                <img class="rounded-circle img-fluid d-block mx-auto" src={image_url} alt=""
                    style={{width: "200px", height: "200px"}}/>
                <h3 style={{color: "#e50202", marginTop: "2%"}}>{name}</h3>
                <hr class="style14" />
                <p style={{"fontSize": "15px", "fontStyle": "italic"}}>{designation}</p>
                <p style={{"fontSize": "16px"}}>Batch-{batch}</p>
                <hr class="style14"></hr>
                <div class="wrapper">
                    { facebook_url
                        ? <a target="_blank" rel="noopener noreferrer" href={facebook_url}><i
                        class="fa fa-3x fa-facebook-square"></i></a> : <a></a>}
                    { github_url
                        ? <a target="_blank" rel="noopener noreferrer" href={github_url}><i
                        class="fa fa-3x fa-github"></i></a> : <a></a>}
                    { linkedin_url
                        ? <a target="_blank" rel="noopener noreferrer" href={linkedin_url}><i
                        class="fa fa-3x fa-linkedin-square"></i></a> : <a></a>}
                    { googleplus_url
                        ? <a target="_blank" rel="noopener noreferrer" href={googleplus_url}><i
                        class="fa fa-3x fa-google-plus"></i></a> : <a></a>}
                </div>
            </div>
        );
    }
}

export default Devs;
