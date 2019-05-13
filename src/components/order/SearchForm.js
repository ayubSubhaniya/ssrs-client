import React from 'react';
import {handleChange} from "../../helper/StateUpdate";

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

    render() {
        return (
            <div className="m-4">
                <form autoComplete="off" onSubmit={(e) => {
                    e.preventDefault();
                    const searchQuery = {};
                    if(this.state.orderNo)
                        searchQuery.orderNo = this.state.orderNo;
                    if(this.state.daiictId)
                        searchQuery.daiictId = this.state.daiictId;
                    if(this.state.paymentCode)
                        searchQuery.paymentCode = this.state.paymentCode;

                    this.props.onSubmit(searchQuery);
                }}>
                    <div className="form-row col-md-12">
                        <div className={'form-group col-md-4 d-flex'}>
                            <label>OrderNo:</label>
                            <input name="orderNo"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   className={'form-control ml-4'} type={'text'}/>
                        </div>
                        <div className={'form-group col-md-4 d-flex'}>
                            <label>daiictId:</label>
                            <input name="daiictId"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   className={'form-control ml-4'} type={'text'}/>
                        </div>
                        <div className={'form-group col-md-4 d-flex'}>
                            <label>Payment Code:</label>
                            <input name="paymentCode"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   className={'form-control ml-4'} type={'text'}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
