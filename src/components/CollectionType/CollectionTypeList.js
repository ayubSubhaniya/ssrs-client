import React, {Component} from 'react';
import _ from "lodash"
import CollectionTypeDetails from "./CollectionTypeDetails";
import EditButton from "./EditButton";
import Switch from "../service/Switch";

class CollectionTypeList extends Component {

    render() {
        console.log(this.props);
        return (
            <div className={'container container-custom'}>
                <div id="accordion">
                    {
                        _.map(this.props.collectionTypes, (collectionType, i) => {
                            return (
                                <div key={collectionType._id} className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center p-0">
                                        <a className="collapsed card-link text-dark w-100 h-100 p-3 ml-2"
                                           data-toggle="collapse"
                                           href={"#collapse" + i}>
                                            <h4 className={'m-0'}> {collectionType.name}</h4>
                                        </a>
                                        <div className='d-flex p-2 align-items-center justify-content-center'>
                                            <EditButton
                                                collectionType={collectionType}
                                                path={'/collectionType/edit'}
                                                index={i}/>
                                            <Switch
                                                handleClick={this.props.toggleCollectionType}
                                                index={i}
                                                isChecked={collectionType.isActive ? true : false}/>
                                        </div>
                                    </div>
                                    <div id={'collapse' + i} className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            <CollectionTypeDetails collectionType={collectionType}
                                                                   user={this.props.user}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CollectionTypeList;

