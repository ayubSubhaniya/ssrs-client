import React, { Component } from 'react';
import {PanelGroup,Panel} from 'react-bootstrap'
import {Service} from "../../test/Services";
import {domainUrl} from "../../config/configuration";
import {Link} from "react-router-dom"
import _ from "lodash"
import Button from "../public-page/Hyperlink";

class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            activeKey: '0',
            services: Service
        };
        this.fetchServices();
    }

    fetchServices = () => {
        const that  = this;
        const url = domainUrl + '/services'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                try{
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        services: obj
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
                               <Panel eventKey={i+1}>
                                    <Panel.Heading>
                                        <div className={'service-panel'}>
                                            <Panel.Title toggle>{service.name}</Panel.Title>
                                            <Link to={{
                                                pathname: '/service/edit',
                                                state: {service}
                                            }}>
                                            <div className="btn btn-default btn-sm"
                                                    data-index={i} >
                                                <span className="glyphicon glyphicon-pencil"></span>
                                            </div>
                                            </Link>
                                        </div>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        {service.description}
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

