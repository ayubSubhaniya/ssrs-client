import _ from "lodash";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { isSuperAdmin } from "../../helper/userType";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import Switch from "../Switch";

class CollectionTypeList extends Component {
    render() {
        return (
            <div className={'container container-custom'}>
                <div className={'list-group'}>
                    {
                        _.map(this.props.collectionTypes, (collectionType, i) => {
                            return (
                                <React.Fragment>
                                    <div key={i}
                                        className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <h5 className="mb-2">{collectionType.name + " ( ₹ " + collectionType.baseCharge + " )"}</h5>
                                                <p className="mb-1">{collectionType.description}</p>
                                            </div>
                                            <div className={'d-flex flex-direction-col'} style={{'alignItems': "center"}}>
                                                <Switch
                                                    handleClick={this.props.toggleCollectionType}
                                                    index={i}
                                                    isChecked={collectionType.isActive ? true : false}
                                                    isDisabled={!isSuperAdmin(this.props.user)} />
                                                {
                                                    isSuperAdmin(this.props.user)
                                                    ?   <div className="d-flex flex-direction-col">
                                                        <EditButton
                                                            data={collectionType}
                                                            path={'/collectionType/edit/' + i} />
                                                        <DeleteButton
                                                            handleClick={this.props.deleteCollectionType}
                                                            index={i} />
                                                        </div>
                                                    :   ""
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
                        ? <div className={'d-flex justify-content-center mt-3'}>
                            <Link to={'/collectionType/add'}>
                                <button
                                    className='btn btn-outline-dark btn-lg mt-3'
                                    type="button">
                                    Add New Collection Type
                                </button>
                            </Link>
                        </div>
                        : ""
                }
            </div>
        );
    }
}

export default CollectionTypeList;

