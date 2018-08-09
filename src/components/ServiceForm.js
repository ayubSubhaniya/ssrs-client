import React, { Component } from 'react';
import Header from './Header';
import {domainUrl} from '../config/configuration'


class ServiceForm extends Component {
    constructor() {
        super();
        this.fetchCollectioType();
        this.state = {
            name: '',
            description: '',
            maxUnits: '',
            baseCharge: ''
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handlemaxUnitsChange = (event) => {
        this.setState({
            maxUnits: event.target.value
        })
    }

    handlebaseChargeChange = (event) => {
        this.setState({
            baseCharge: event.target.value
        })
    }

    fetchCollectioType = () => {
        this.collectionType = [
            {
                "_id": "5b680b0609940b21b0da28ff",
                "baseCharge": 100,
                "name": "Sealed Envelop",
                "description": "Document in sealed envelop",
                "createdOn": "2018-08-06T08:47:02.500+0000",
                "createdBy": 201501433,
            }
        ]
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = domainUrl + '/service/'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == 201) {
                alert('service added sucessfully');
                const response = JSON.parse(request.response)
            };
        };
        request.send(JSON.stringify(this.state));
    }
    render() {
        return (
            <React.Fragment>
                <Header title={'Manage Services'} />
                <div className="manageservice-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-25" style={{ "width": "10%" }}>
                                <label for="serviceName">Service Name</label>
                            </div>
                            <div className="col-25">
                                <input type="text" id="serviceName" name="serviceName" placeholder="Enter Service Name"
                                    value={this.state.name} onChange={this.handleNameChange} />
                            </div>
                            <div className="col-25" style={{ "width": "10%" }}>
                                <label for="baceCharge">Base Charge</label>
                            </div>
                            <div className="col-25">
                                <input type="text" id="baseCharge" name="baseCharge" placeholder="Enter Charge"
                                    value={this.state.baseCharge} onChange={this.handlebaseChargeChange}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25" style={{ "width": "10%" }}>
                                <label for="subject">Service Description</label>
                            </div>
                            <div class="col-75">
                                <textarea id="subject" name="subject" placeholder="Write Service Description" style={{ "height": "200px" }}
                                    value={this.state.description} onChange={this.handleDescriptionChange}
                                ></textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-25" style={{ "width": "10%" }}>
                                <label for="maxUnits">Max unit</label>
                            </div>
                            <div class="col-75">
                                <input type="text" id="maxUnits" style={{ "width": "30%" }} name="firstname" placeholder="Enter Maximum Allowed Unit"
                                    value={this.state.maxUnits} onChange={this.handlemaxUnitsChange}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default ServiceForm;
