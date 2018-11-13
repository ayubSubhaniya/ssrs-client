import React, { Component } from 'react';
import _ from "lodash"
import EditButton from "../EditButton";
import Switch from "../Switch";
import { Link } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import {isSuperAdmin} from "../../helper/userType";

class ParameterList extends Component {
    render() {
        return (
            <div className={'container container-custom'}>
                <div className={'list-group'}>
                    {
                        _.map(this.props.parameters, (parameter, i) => {
                            return (
                                <React.Fragment>
                                    <div key={i}
                                        className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <h5 className="mb-2">{parameter.name + " ( ₹ " + parameter.baseCharge + " )"}</h5>
                                                <p className="mb-1">{parameter.description}</p>
                                            </div>
                                            <div className={'d-flex flex-direction-col'} style={{'alignItems': "center"}}>
                                                <Switch
                                                    handleClick={this.props.toggleParameter}
                                                    index={i}
                                                    isChecked={parameter.isActive ? true : false}
                                                    isDisabled={!isSuperAdmin(this.props.user)} />
                                                {
                                                    isSuperAdmin(this.props.user)
                                                    ?   <div className="d-flex flex-direction-col">
                                                        <EditButton
                                                            data={parameter}
                                                            path={'/parameter/edit/' + i} />
                                                        <DeleteButton handleClick={this.props.deleteParameter}
                                                            index={i} />
                                                        </div>
                                                    : ""
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                {
                    isSuperAdmin(this.props.user)
                    ?   <div className={'d-flex justify-content-center mt-3'}>
                            <Link to={'/parameter/add'}>
                                <button
                                    className='btn btn-outline-dark btn-lg mt-3'
                                    type="button">
                                    Add New Parameter
                                </button>
                            </Link>
                        </div>
                    :   ""
                }
            </div>
        );
    }
}

export default ParameterList;

