import React, {Component} from 'react';
import NavigationBar from '../NavigationBar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from "lodash"
import 'react-datepicker/dist/react-datepicker.css';
import {makeCall} from '../../helper/caller';
import {handleError} from "../../helper/error";

class dashboard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            todayService: {
                order: {count: '0'}
            },
            pastService: [],
            totalPayment: 0,
            totalonline: 0,
            totaloffline: 0,
            totalOrders: 0,
            todayDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            todayDate: new Date()
        })
        this.getDailyCartStatistics()
    };

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleEndChange = (date) => {
        this.setState({
            endDate: date
        });
    };

    dateToString = (date) => {
        date = new Date(date.toString());
        return date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
    }

    getUrlQuery = () => {
        return 'startDate=' + this.dateToString(this.state.startDate)
            + '&' + 'endDate=' + this.dateToString(this.state.endDate);
    }

    getCartStatistics = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/dashboard/cart?' + this.getUrlQuery()
        })
            .then((response) => {
                this.setState({
                    pastService: response
                })
            })
            .catch((error) => {
                handleError(error);
            })

    }


    getInitialUrlQuery = () => {
        return 'startDate=' + this.dateToString(this.state.todayDate)
            + '&' + 'endDate=' + this.dateToString(this.state.todayDate);
    }


    getDailyCartStatistics = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/dashboard/cart?' + this.getInitialUrlQuery()
        })
            .then((response) => {
                _.forEach(response.paymentType, (e) => {
                    this.setState({
                        ["total" + e.paymentType]: e.revenue
                    })
                })
                this.setState({
                    todayService: response,
                    totalOrders: response.order ? response.order.count : 0
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }


    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <p className="text-center"
                   style={{fontFamily: "Courier New", fontSize: "60px", color: "blue", marginTop: "2%"}}>
                    <strong>Dashboard</strong></p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" style={{marginTop: "5%"}}>
                            <div className="row card d-flex flex-row p-4 dash" style={{backgroundColor: "#aec5c1"}}>
                                <p className="w-100 mb-4 text-center" style={{color: "black", fontSize: "25px"}}>
                                    <strong>Daily
                                        Statistics</strong></p>
                                <div className="col-sm-3">
                                    <div className="card p-4 dash" style={{backgroundColor: "#ff140f"}}>
                                        <h4 className="text-center" style={{fontSize: "30px", color: "white"}}>
                                            <strong>₹ {this.state.totalonline + this.state.totaloffline}</strong></h4>
                                        <p className="text-center" style={{fontSize: "15px", color: "black"}}><strong>Total
                                            Payment</strong></p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card p-4 dash" style={{backgroundColor: "#ff140f"}}>
                                        <h4 className="text-center" style={{fontSize: "30px", color: "white"}}>
                                            <strong>₹ {this.state.totalonline}</strong></h4>
                                        <p className="text-center" style={{fontSize: "15px", color: "black"}}><strong>Online
                                            Payment</strong></p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card p-4 dash" style={{backgroundColor: "#ff140f"}}>
                                        <h4 className="text-center" style={{fontSize: "30px", color: "white"}}>
                                            <strong>₹ {this.state.totaloffline}</strong></h4>
                                        <p className="text-center" style={{fontSize: "15px", color: "black"}}><strong>Offline
                                            Payment</strong></p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card p-4 dash" style={{backgroundColor: "#ff140f"}}>
                                        <h4 className="text-center" style={{fontSize: "30px", color: "white"}}>
                                            <strong>{this.state.totalOrders}</strong></h4>
                                        <p className="text-center" style={{fontSize: "15px", color: "black"}}><strong>Total
                                            Orders</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row card d-flex flex-row p-4 dash"
                                 style={{backgroundColor: "#aec5c1", marginTop: "5%"}}>
                                <p className="w-100 mb-4 text-center" style={{color: "black", fontSize: "25px"}}>
                                    <strong>Service
                                        Revenue</strong></p>
                                <div className="col-sm-6">
                                    <div className="card p-4 dash" style={{backgroundColor: "#f1f1f1"}}>
                                        <p className="w-100 mb-2 text-center"
                                           style={{color: "black", fontSize: "15px", borderBottom: "3px solid red"}}>
                                            <strong>Daily</strong></p>
                                        <table className="table table-hover">
                                            <tbody>
                                            {/*<tr>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}><strong>Service1</strong>*/}
                                            {/*</td>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}>100</td>*/}
                                            {/*<td>₹ 100,000</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}>Service2</td>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}>100</td>*/}
                                            {/*<td>₹ 100,000</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}>Service3</td>*/}
                                            {/*<td style={{borderRight: "1px solid #e1e1e1"}}>100</td>*/}
                                            {/*<td>₹ 100,000</td>*/}
                                            {/*</tr>*/}


                                            {
                                                _.map(this.state.todayService.service, (service) => {
                                                    return (
                                                        <tr>
                                                            <td style={{borderRight: "1px solid #e1e1e1"}}>
                                                                <strong>{service.service.name}</strong></td>
                                                            <td style={{borderRight: "1px solid #e1e1e1"}}>
                                                                {service.count}
                                                            </td>
                                                            <td>{`₹ ${service.revenue}`}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card p-4 dash" style={{backgroundColor: "#f1f1f1"}}>
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <DatePicker
                                                    dateFormat="YYYY/MM/DD"

                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    placeholderText="Start Date"/>
                                            </div>
                                            <div className="col-sm-4">
                                                <DatePicker
                                                    dateFormat="YYYY/MM/DD"
                                                    selected={this.state.endDate}
                                                    onChange={this.handleEndChange}
                                                    placeholderText="End Date"/>
                                            </div>

                                            <div className="col-sm-3">
                                                <input type="submit"
                                                       className="btn btn-primary style-btn"
                                                       value="Submit"
                                                       onClick={this.getCartStatistics}/>
                                            </div>
                                            <table className="table table-hover mt-2">
                                                <tbody>
                                                {
                                                    _.map(this.state.pastService.service, (service) => {
                                                        return (
                                                            <tr>
                                                                <td style={{borderRight: "1px solid #e1e1e1"}}>
                                                                    <strong>{service.service.name}</strong></td>
                                                                <td style={{borderRight: "1px solid #e1e1e1"}}>
                                                                    {service.count}
                                                                </td>
                                                                <td>{`₹ ${service.revenue}`}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default dashboard;
