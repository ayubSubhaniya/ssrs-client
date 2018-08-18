import React, {Component} from 'react';
import {PanelGroup, Panel} from 'react-bootstrap'
import {Link} from "react-router-dom"
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import * as HttpStatus from 'http-status-codes';
import {fetch} from "../../helper/FetchData"
import "./../../styles/bootstrap-toggle.css"


class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            activeKey: '0',
            service: []
        };
        this.fetch = fetch.bind(this);
        this.fetch("service")
    }

    handleSelect(activeKey) {
        this.setState({activeKey});
    }

    toggleService = (service) => {
        console.log(service)
        const that = this;
        // const url = domainUrl + '/service/' + service._id;
        // const request = new XMLHttpRequest();
        // request.open('PATCH', url, true);
        // request.withCredentials = true;
        // request.setRequestHeader("Content-type", "application/json");
        // request.onload = function () {
        //     if (this.status == HttpStatus.ACCEPTED) {
        //
        //         const response = JSON.parse(request.response)
        //         console.log(response);
        //         that.props.history.push('/service');
        //     }
        //     ;
        // // };
        this.setState({
            service: _.map(this.state.service,(o) => {
                if(o._id==service._id){
                    o.isActive = !o.isActive;
                }
                return o;
            }),
        });


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
                        _.map(this.state.service, (service, i) => {
                            return (
                                <Panel key={service._id} eventKey={i + 1}>
                                    <Panel.Heading>
                                        <div className={'service-panel'}>
                                            <Panel.Title toggle>{service.name}</Panel.Title>
                                            <div style={{"display":"flex"}}>
                                                <Link to={{
                                                    pathname: '/service/edit',
                                                    state: {service}
                                                }}>
                                                    <div className="btn btn-default btn-sm"
                                                         data-index={i}>
                                                        <span className="glyphicon glyphicon-pencil"></span>
                                                    </div>
                                                </Link>
                                                <div type="button" className="margin-l">
                                                    <div className={"toggle btn" + (service.isActive?" btn-primary":" btn-default off")} data-toggle="toggle" onClick={() => this.toggleService(service)}>
                                                        <input type="checkbox" data-toggle="toggle" />
                                                        <div className={'toggle-group'}>
                                                            <label className={'btn btn-primary toggle-on'}>On</label>
                                                            <label className={'btn btn-default active toggle-off'}>Off</label>
                                                            <span className={'toggle-handle btn btn-default'}></span>
                                                        </div>
                                                    </div>
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
                <Link to={'/service/add'} style={{textDecoration: 'none'}}>
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

