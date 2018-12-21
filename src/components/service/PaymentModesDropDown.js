import React, {Component} from 'react';
import _ from "lodash";
import {camelCaseToWords} from "../../helper/String";

class PaymentModesDropDown extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{"Payment Mode"}</label>
                <div className="dropdown">
                    <div className="btn dropdown-toggle form-control"
                            type="button"
                            data-toggle="dropdown">
                        {this.props.btnLabel + " "}
                        <span className="caret"></span></div>
                    <ul className="dropdown-menu col-sm-12">
                        {
                            _.map(this.props.options, (o,index) => {
                                return (
                                    <li key={index}
                                        data-value={o}
                                        className='dropdown-item pl-4 pt-2 pb-2'
                                        style={{"cursor": "pointer"}}
                                        onClick={this.props.handleOptionChange}>
                                        {camelCaseToWords(o)}
                                    </li>)

                            })
                        }

                    </ul>
                </div>
            </div>
        );
    }
}

export default PaymentModesDropDown;
