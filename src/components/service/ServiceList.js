import React, {Component} from 'react';
import {Link} from "react-router-dom"
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
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
            service: _.map(this.state.service, (o) => {
                if (o._id == service._id) {
                    o.isActive = !o.isActive;
                }
                return o;
            }),
        });


    }

    render() {
        return (
            <div className={'container container-custom'}>
                <div id="accordion">
                    {
                        _.map(this.state.service, (service, i) => {
                            return (
                                <div key={service._id} className="card">
                                    <div className="card-header d-flex justify-content-between">
                                        <a className="collapsed card-link" data-toggle="collapse"
                                           href={"#collapse" + i}>
                                            {service.name}
                                        </a>
                                        <div className='d-flex'>
                                            <Link to={{
                                                pathname: '/service/edit',
                                                state: {service}
                                            }}>
                                                <div className="btn btn-default btn-sm"
                                                     data-index={i}>
                                                    <i className="fa fa-pencil"
                                                       style={{"fontSize":"24px","color":"black"}}></i>                                               </div>
                                            </Link>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                    <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div id={'collapse' + i} className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <ServiceDetails service={service}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'d-flex justify-content-center margin-top-md'}>
                    <Link to={'/service/add'} style={{textDecoration: 'none'}}>
                        <input
                            className='submit'
                            type="submit"
                            value="Add New Service"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ServiceList;

