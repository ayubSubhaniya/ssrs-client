import React, {Component} from 'react';
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import {asyncFetch} from "../../helper/FetchData"
import EditButton from "../EditButton";
import Switch from "./Switch";
import AuthorizedComponent from "../AuthorizedComponent";
import {domainUrl} from '../../config/configuration'
import * as HttpStatus from "http-status-codes";
import ButtonLink from "./ButtonLink";
import Spinner from "../Spinner";
import OrderForm from "../order/cart/OrderForm";

class ServiceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            service: [],
            showSpinner: false
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount() {
        this.asyncFetch('service');
    }

    toggleService = (index) => {
        this.props.showSpinner();
        const service = this.state.service[index];
        const that = this;
        const url = domainUrl + '/service/changeStatus/' + service._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                const response = JSON.parse(request.response)
                const serviceList = that.state.service;
                serviceList[index] = response.service;
                that.setState({
                    service: serviceList,
                });
            }
            that.props.hideSpinner();
        }
        request.send(JSON.stringify({isActive: !service.isActive}));
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
                                            {
                                                this.props.user.userType === 'student' ?
                                                    (
                                                        <div>
                                                            <button type="button"
                                                                    className="btn btn-success btn-large ml-2 mr-2"
                                                                    data-toggle="modal"
                                                                    data-target={"#myModal" + service._id}>
                                                                Apply
                                                            </button>
                                                            <OrderForm service={service} id={service._id}/>
                                                        </div>)
                                                    : ''
                                            }
                                            <AuthorizedComponent
                                                component={EditButton}
                                                permission={this.props.user.userType === 'superAdmin'}
                                                data={service}
                                                path={'/service/edit/' + i}/>
                                            <AuthorizedComponent
                                                component={Switch}
                                                handleClick={this.toggleService}
                                                index={i}
                                                isChecked={service.isActive ? true : false}
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
                <AuthorizedComponent
                    component={ButtonLink}
                    permission={this.props.user.userType === 'superAdmin'}
                />
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default ServiceList;

