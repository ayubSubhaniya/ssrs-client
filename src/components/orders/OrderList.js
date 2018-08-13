import React, { Component } from 'react';
import {PanelGroup,Panel} from 'react-bootstrap'
import {domainUrl} from "../../config/configuration";
import {Link} from "react-router-dom"
import _ from "lodash"
import OrderDetails from "./OrderDetails";

class OrderList extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            activeKey: '0',
            orders: []
        };
        this.fetchOrders();
    }

    fetchOrders = () => {
        console.log("fetching orders");
        const that  = this;
        const url = domainUrl + '/order'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                try{
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        orders: obj
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
                        _.map(this.state.orders,(order,i) => {
                            return(
                                <Panel eventKey={i+1}>
                                    <Panel.Heading>
                                        <div className={'service-panel'}>
                                            <Panel.Title toggle>{order.name}</Panel.Title>
                                            <Link to={{
                                                pathname: '/order/edit',
                                                state: {order}
                                            }}>
                                                <div className="btn btn-default btn-sm"
                                                     data-index={i} >
                                                    <span className="glyphicon glyphicon-pencil"></span>
                                                </div>
                                            </Link>
                                        </div>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <OrderDetails order={order}/>
                                    </Panel.Body>
                                </Panel>
                            )
                        })
                    }
                </PanelGroup>
                {/*<Link to={'/order/add'} style={{ textDecoration: 'none' }}>*/}
                    {/*<input*/}
                        {/*className='submit'*/}
                        {/*type="submit"*/}
                        {/*value="Add New Order"/>*/}
                {/*</Link>*/}
            </div>
        );
    }
}

export default OrderList;

