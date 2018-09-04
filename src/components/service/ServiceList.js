import React, {Component} from 'react';
import {Link} from "react-router-dom"
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import {fetch} from "../../helper/FetchData"
import EditButton from "./EditButton";
import Switch from "./Switch";
import ApplyButton from "./ApplyButton";
import AuthorizedComponent from "../AuthorizedComponent";
import {domainUrl} from '../../config/configuration'
import * as HttpStatus from "http-status-codes";
import ConfirmModal from "../ConfirmModal";

class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            service: [],
            isSwitchDisabled: false
        };
        this.fetch = fetch.bind(this);
        this.fetch("service")
    }

    toggleService = (index) => {
        this.setState({
            isSwitchDisabled: true
        })
        const service = this.state.service[index];
        const that = this;
        const url = domainUrl + '/service/' + service._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                const response = JSON.parse(request.response)
                const serviceList = that.state.service;
                serviceList[index] = response.service;
                that.setState({
                    service: serviceList,
                    isSwitchDisabled: false
                });
            }
        }
        request.send(JSON.stringify({isActive:!service.isActive}));
    }

    render() {
        return (
            <div className={'container container-custom'}>
                <div id="accordion">
                    {
                        _.map(this.state.service, (service, i) => {
                            return (
                                <div key={service._id} className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center p-0">
                                        <a className="collapsed card-link text-dark w-100 h-100 p-3 ml-2"
                                           data-toggle="collapse"
                                           href={"#collapse" + i}>
                                            <h4 className={'m-0'}> {service.name}</h4>
                                        </a>
                                        <div className='d-flex p-2 align-items-center justify-content-center'>
                                            <AuthorizedComponent
                                                component={ApplyButton}
                                                permission={this.props.user.userType === 'student'}
                                                service={service}
                                                index={i}/>
                                            <AuthorizedComponent
                                                component={EditButton}
                                                permission={this.props.user.userType === 'superAdmin'}
                                                service={service}
                                                index={i}/>
                                            <AuthorizedComponent
                                                component={Switch}
                                                handleClick={this.toggleService}
                                                index={i}
                                                isDisabled={this.state.isSwitchDisabled}
                                                isChecked={service.isActive?true:false}
                                                permission={this.props.user.userType === 'superAdmin'}/>
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
                <div className={'d-flex justify-content-center mt-3'}>
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

