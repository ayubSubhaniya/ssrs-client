import React, {Component} from 'react';
import _ from "lodash";

class ApllicationSpecificDropDown extends Component {
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
                            <hr className="m-0 mt-1"/>
                            {
                                _.map(this.props.options, (o, index) => {
                                    return (
                                        <li key={o.name}
                                            className="dropdown-item checkbox p-0">
                                            <label className={'checkbox-cstm pl-4 pt-2 pb-2'}
                                                   style={{"width": '100%', "minHeight": '26px'}}>
                                                <input onClick={this.props.handleOptionChange}
                                                       data-index={index}
                                                       type="checkbox"
                                                       name={this.props.name}
                                                       checked={o.isSelected}/>
                                                {o.name}
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

export default ApllicationSpecificDropDown;
