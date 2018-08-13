import React, { Component } from 'react';
import {PanelGroup,Panel} from 'react-bootstrap'
import {Service} from "../../test/Services";
import {domainUrl} from "../../config/configuration";
import {Link} from "react-router-dom"
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";

class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            activeKey: '0',
            services: []
        };
        this.fetchServices();
    }

    fetchServices = () => {
        console.log("fetching services");
        const that  = this;
        const url = domainUrl + '/service'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 200) {
                try{
                    const obj = JSON.parse(request.response);
                    console.log(obj)
                    that.setState({
                        services: obj.service
                    })
                }catch(e) {
                    console.error(e);
                }
            };
        };
        request.send();
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }

    deleterService = (service) => {
        const that = this;
        const url = domainUrl + '/service/' + service._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                console.log("Deleted: ",request.response,service);
                that.setState({
                    services: _.filter(that.state.services,(o) => {return(o._id!==service._id)})
                })
            }
        };
        request.send();
    }

    render() {
        return (
            <div className={'service-list-container'}>
                <PanelGroup
                    accordion
                    id="accordion-controlled-example"
                    activeKey={this.state.activeKey}
                    onSelect={this.handleSelect}
                >

                    {
                        _.map(this.state.services,(service,i) => {
                           return(
                               <Panel key={service._id} eventKey={i+1}>
                                    <Panel.Heading>
                                        <div className={'service-panel'}>
                                            <Panel.Title toggle>{service.name}</Panel.Title>

                                            <div>
                                                <Link to={{
                                                    pathname: '/service/edit',
                                                    state: {service}
                                                }}>
                                                    <div className="btn btn-default btn-sm"
                                                         data-index={i}>
                                                        <span className="glyphicon glyphicon-pencil"></span>
                                                    </div>
                                                </Link>
                                                <div type="button" className="btn btn-default btn-sm margin-l" onClick={() => this.deleterService(service)}>
                                                    <span className="glyphicon glyphicon-trash"></span>
                                                </div>
                                            </div>

                                        </div>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <ServiceDetails service={service}/>
                                    </Panel.Body>
                               </Panel>
                           )
                        })
                    }
                </PanelGroup>
                <Link to={'/service/add'} style={{ textDecoration: 'none' }}>
                    <input
                        className='submit'
                        type="submit"
                        value="Add New Service"/>
                </Link>
            </div>
        );
    }
}

export default ServiceList;

