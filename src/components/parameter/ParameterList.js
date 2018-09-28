import React, {Component} from 'react';
import _ from "lodash"
import EditButton from "../EditButton";
import Switch from "../service/Switch";
import {Link} from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

class ParameterList extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false
        }
    }

    openConfirmationModal = () => {
        this.setState({
            isModalOpen: true
        })
    };

    closeConfirmationModal = () => {
        this.setState({
            isModalOpen: false
        })
    };

    onYes = (index) => {
        this.props.deleteParameter(index);
        this.closeConfirmationModal();
    };

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
                                            <h5 className="m-0">{parameter.name + " ( ₹ " + parameter.baseCharge + " )"}</h5>
                                            <div className={'d-flex flex-direction-col'}>
                                                <EditButton
                                                    data={parameter}
                                                    path={'/parameter/edit/' + i}/>
                                                <Switch
                                                    handleClick={this.props.toggleParameter}
                                                    index={i}
                                                    isChecked={parameter.isActive ? true : false}/>
                                                <button className="btn btn-danger btn-sm ml-2"
                                                        onClick={this.openConfirmationModal}
                                                        style={{"fontSize": "20px", "color": "black"}}>
                                                    <i className="fa fa-trash-o"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mb-1">{parameter.description}</p>
                                    </div>
                                    <ConfirmModal open={this.state.isModalOpen}
                                                  onYes={() => this.onYes(i)}
                                                  close={this.closeConfirmationModal}/>
                                </React.Fragment>
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

