import React, {Component} from 'react';
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import EditButton from "../EditButton";
import Switch from "../Switch";
import AuthorizedComponent from "../AuthorizedComponent";
import {domainUrl} from '../../config/configuration'
import * as HttpStatus from "http-status-codes";
import ButtonLink from "./ButtonLink";
import Spinner from "../Spinner";
import DeleteButton from "../DeleteButton";
import {isStudent, isSuperAdmin} from "../../helper/userType";
import ApplyButton from "./ApplyButton";
import {makeCall} from "../../helper/caller";

class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            service: [],
            showSpinner: false
        };
    }

    componentDidMount() {
       this.getService();
    }

    getService = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/service'
        })
            .then((response) => {
                this.setState({
                    service: response.service,
                });
            })
            .catch(error => console.log(error));
    }

    deleteService = (index) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/service/' + this.state.service[index]._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const service = that.state.service;
                that.setState({
                    service: [...service.slice(0, index), ...service.slice(index + 1)]
                })
            }
            that.setState({
                showSpinner: false
            })
        }
        request.send();
    }

    toggleService = (index) => {
        const service = this.state.service[index];
        makeCall({
            jobType: "PATCH",
            urlParams: '/service/changeStatus/' + service._id,
            params: {
                isActive: !service.isActive
            }
        })
            .then((response) => {
                const serviceList = this.state.service;
                serviceList[index] = response.service;
                this.setState({
                    service: serviceList,
                });
            })
            .catch(error => console.log(error));
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
                                            <AuthorizedComponent component={ApplyButton}
                                                                 service={service}
                                                                 permission={isStudent(this.props.user)}/>
                                            <AuthorizedComponent
                                                component={EditButton}
                                                permission={isSuperAdmin(this.props.user)}
                                                data={service}
                                                path={'/service/edit/' + i}/>
                                            <AuthorizedComponent
                                                component={Switch}
                                                handleClick={this.toggleService}
                                                index={i}
                                                isChecked={service.isActive ? true : false}
                                                permission={isSuperAdmin(this.props.user)}/>
                                            <AuthorizedComponent
                                                permission={isSuperAdmin(this.props.user)}
                                                handleClick={this.deleteService}
                                                index={i}
                                                component={DeleteButton}/>
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
                <AuthorizedComponent
                    component={ButtonLink}
                    permission={isSuperAdmin(this.props.user)}
                />
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default ServiceList;

