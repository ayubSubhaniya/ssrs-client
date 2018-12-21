import React, {Component} from 'react';
import _ from "lodash";

class MultiSelectDropDownControled extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <div className="dropdown">
                    <div className="btn dropdown-toggle form-control" type="button"
                            data-toggle="dropdown">{this.props.btnLabel + " "}
                        <span className="caret"></span></div>
                    <ul className="dropdown-menu col-sm-12">
                        <form>
                            <li className="p-0 d-flex justify-content-around">
                                <div onClick={this.props.onSelectAll}
                                     className={'btn btn-light'}
                                     data-name={this.props.name}>
                                    Select All
                                </div>
                                <div onClick={this.props.onDeselectAll}
                                     className={"btn btn-light"}
                                     data-name={this.props.name}>
                                    Deselect All
                                </div>
                            </li>
                            {
                                _.map(this.props.options, (o, index) => {
                                    return (
                                        <li key={o._id}
                                            className="dropdown-item checkbox p-0">
                                            <label data-toggle="tooltip"
                                                   title={o.description}
                                                   className={'checkbox-cstm pl-4 pt-2 pb-2'}
                                                   style={{"width": '100%', "minHeight": '26px'}}>
                                                <input onClick={this.props.handleOptionChange}
                                                       data-index={index}
                                                       type="checkbox"
                                                       name={this.props.name}
                                                       checked={o.isSelected}/>
                                                {o.name + " (₹" + o.baseCharge + ")"}
                                            </label>
                                        </li>)
                                })
                            }
                        </form>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MultiSelectDropDownControled;
