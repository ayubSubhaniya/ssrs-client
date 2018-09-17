import React, {Component} from 'react';
import _ from "lodash"
import ParameterDetails from "./ParameterDetails";
import EditButton from "../parameter/EditButton";
import Switch from "../service/Switch";
import {Link} from "react-router-dom";

class ParameterList extends Component {

    render() {

        return (
            <div className={'container container-custom'}>
                <div id="accordion">
                    {
                        _.map(this.props.parameters, (parameter, i) => {
                            return (
                                <div key={parameter._id} className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center p-0">
                                        <a className="collapsed card-link text-dark w-100 h-100 p-3 ml-2"
                                           data-toggle="collapse"
                                           href={"#collapse" + i}>
                                            <h4 className={'m-0'}> {parameter.name}</h4>
                                        </a>
                                        <div className='d-flex p-2 align-items-center justify-content-center'>
                                            <EditButton
                                                parameter={parameter}
                                                path={'/parameter/edit'}
                                                index={i}/>
                                            <Switch
                                                handleClick={this.props.toggleCollectionType}
                                                index={i}
                                                isChecked={parameter.isActive ? true : false}/>
                                        </div>
                                    </div>
                                    <div id={'collapse' + i} className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <ParameterDetails parameter={parameter}
                                                              user={this.props.user}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'d-flex justify-content-center mt-3'}>
                    <Link to={'/parameter/add'} style={{textDecoration: 'none'}}>
                        <input
                            className='submit'
                            type="submit"
                            value="Add New Parameter"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ParameterList;

