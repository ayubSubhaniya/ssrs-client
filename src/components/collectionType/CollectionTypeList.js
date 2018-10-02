import React, {Component} from 'react';
import _ from "lodash"
import EditButton from "../EditButton";
import Switch from "../service/Switch";

class CollectionTypeList extends Component {
    render() {
        return (
            <div className={'container container-custom'}>
                <div className={'list-group'}>
                    {
                        _.map(this.props.collectionTypes, (collectionType, i) => {
                            return (
                                <a href="#"
                                   key={i}
                                   className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="m-0">{collectionType.name + " ( ₹ " + collectionType.baseCharge + " )"}</h5>
                                        <div className={'d-flex flex-direction-col'}>
                                            <EditButton
                                                data={collectionType}
                                                path={'/collectionType/edit/' + i} />
                                            <Switch
                                                handleClick={this.props.toggleCollectionType}
                                                index={i}
                                                isChecked={collectionType.isActive ? true : false}/>
                                        </div>
                                    </div>
                                    <p className="mb-1">{collectionType.description}</p>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CollectionTypeList;

