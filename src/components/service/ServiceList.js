import React, { Component } from 'react';
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import EditButton from "../EditButton";
import Switch from "../Switch";
import AuthorizedComponent from "../AuthorizedComponent";
import ButtonLink from "./ButtonLink";
import DeleteButton from "../DeleteButton";
import { isStudent, isSuperAdmin, isAdmin } from "../../helper/userType";
import ApplyButton from "./ApplyButton";
import { makeCall } from "../../helper/caller";
import { handleError } from "../../helper/error";
import GoToCart from "./GoToCart";
import {modalMessages} from "../../config/configuration"
import {loadSpinner, unloadSpinner} from '../../helper/spinner';
class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            service: [],
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

                let sortedServices = _.sortBy(response.service, (service) => {
                    return service.name;
                });
                
                this.setState({
                    service: sortedServices,
                });
            })
            .catch((error) => {
                handleError(error);
            })
            
    }

    deleteService = (index) => {
       
        makeCall({
            jobType: "DELETE",
            urlParams: '/service/' + this.state.service[index]._id
        })
            .then(() => {
                const service = this.state.service;
                this.setState({
                    service: [...service.slice(0, index), ...service.slice(index + 1)]
                })
            })
            .catch((error) => {
                handleError(error);
            })
           
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
            .catch((error) => {
                handleError(error);
            })
    }

    render() {
        //console.log(this.props.user);
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
                                                permission={isStudent(this.props.user)} />
                                            <AuthorizedComponent
                                                component={Switch}
                                                handleClick={this.toggleService}
                                                index={i}
                                                isChecked={service.isActive ? true : false}
                                                permission={isAdmin(this.props.user)}
                                                isDisabled={!isSuperAdmin(this.props.user)}
                                                message={modalMessages.serviceSwitch} />
                                            <AuthorizedComponent
                                                component={EditButton}
                                                permission={isSuperAdmin(this.props.user)}
                                                data={service}
                                                path={'/service/edit/' + service._id} />
                                            <AuthorizedComponent
                                                permission={isSuperAdmin(this.props.user)}
                                                handleClick={this.deleteService}
                                                index={i}
                                                component={DeleteButton}
                                                message={modalMessages.serviceDelete} />
                                        </div>
                                    </div>
                                    <div id={'collapse' + i} className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <ServiceDetails service={service} />
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
                <AuthorizedComponent
                    component={GoToCart}
                    permission={isStudent(this.props.user)}
                />
               
            
            </div>
        );
    }
}

export default ServiceList;

