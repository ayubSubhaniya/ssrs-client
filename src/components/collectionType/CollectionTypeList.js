import React, {Component} from 'react';
import _ from "lodash"
import EditButton from "../EditButton";
import Switch from "../Switch";
import {Link} from "react-router-dom";
import DeleteButton from "../DeleteButton";

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
                                            <h5 className="m-0">{collectionType.name + " ( ₹ " + collectionType.baseCharge + " )"}</h5>
                                            <div className={'d-flex flex-direction-col'}>
                                                <EditButton
                                                    data={collectionType}
                                                    path={'/collectionType/edit/' + i}/>
                                                <Switch
                                                    handleClick={this.props.toggleCollectionType}
                                                    index={i}
                                                    isChecked={collectionType.isActive ? true : false}/>
                                                <DeleteButton
                                                    handleClick={this.props.deleteCollectionType}
                                                    index={i}/>
                                            </div>
                                        </div>
                                        <p className="mb-1">{collectionType.description}</p>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className={'d-flex justify-content-center mt-3'}>
                    <Link to={'/collectionType/add'} style={{textDecoration: 'none'}}>
                        <input
                            className='submit'
                            type="submit"
                            value="Add New Collection Type"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default CollectionTypeList;

