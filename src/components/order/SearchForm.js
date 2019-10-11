import React from 'react';
import { handleChange } from "../../helper/StateUpdate";
import { isAdmin } from "../../helper/userType";

class SearchForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: '',
            daiictId: '',
            paymentCode: ''
        };
        this.handleChange = handleChange.bind(this);
    }

    searchIt = (e) => {
        e.preventDefault();
        const searchQuery = {};
        if (this.state.orderNo)
            searchQuery.orderId = this.state.orderNo;
        if (this.state.daiictId)
            searchQuery.requestedBy = this.state.daiictId;
        if (this.state.paymentCode)
            searchQuery.paymentCode = this.state.paymentCode;

        this.props.onSubmit(searchQuery);
    }

    render() {
        return (
            <div className="advanced-search">
                <div className="advanced-search-btn d-flex justify-content-end">
                        <div className="cursor-pointer btn btn-outline-primary mr-2" onClick={this.props.toggleSort}>
                            {
                                this.props.sortOrder === '-'
                                ? <span><i className="fa fa-long-arrow-down mr-1"/>{"Newest"}</span>
                                : <span><i className="fa fa-long-arrow-up mr-1"/>{"Oldest"}</span>
                            }
                        </div>
                    <button className="btn btn-primary" data-toggle="collapse" data-target="#searchForm" aria-expanded="false" aria-controls="searchForm">
                        <span><i class="fa fa-bars mr-2"/>{"Search options"}</span>
                    </button>
                </div>
                <div id="searchForm" className="card collapse multi-collapse">
                    <form autoComplete="off" onSubmit={(e) => this.searchIt(e)}>
                        <div className="form-row">
                            <div className={'form-group col-sm-12'}>
                                <label>Order No:</label>
                                <input name="orderNo"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className={'form-control'} type={'text'}
                                    placeholder='18-digit unique order number' />
                            </div>
                            {
                                isAdmin(this.props.user)
                                    ? <div className={'form-group col-sm-12'}>
                                        <label>DA-IICT ID:</label>
                                        <input name="daiictId"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            className={'form-control'} type={'text'}
                                            placeholder='10-digit DAIICT ID' />
                                    </div>
                                    : ''
                            }
                            <div className={'form-group col-sm-12'}>
                                <label>Payment Code:</label>
                                <input name="paymentCode"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    className={'form-control'} type={'text'}
                                    placeholder='8-character string' />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchForm;
