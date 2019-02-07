import React, {PureComponent} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import CollectionTypeList from "./CollectionTypeList";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import _ from 'lodash';

class CollectionType extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collectionType: []
        };
    }

    componentDidMount() {
        this.getAllCollectionType();
    }

    getAllCollectionType = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/collectionType'
        })
            .then((response) => {
                let sortedData = _.sortBy(response.collectionType, (data) => {
                    return data.name;
                });
                this.setState({
                    collectionType: sortedData
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    toggleCollectionType = (index) => {
        const collectionType = this.state.collectionType[index];
        makeCall({
            jobType: 'PATCH',
            urlParams: '/collectionType/changeStatus/' + collectionType._id,
            params: {isActive: !collectionType.isActive}
        })
            .then((response) => {
                const collectionTypeList = this.state.collectionType;
                collectionTypeList[index] = response.collectionType;
                this.setState({
                    collectionType: collectionTypeList,
                });
            })
            .catch((error) => {
                handleError(error);
            })
    };

    deleteCollectionType = (index) => {
        makeCall({
            jobType: 'DELETE',
            urlParams: '/collectionType/' + this.state.collectionType[index]._id
        })
            .then(() => {
                const collectionType = this.state.collectionType;
                this.setState({
                    collectionType: [...collectionType.slice(0, index), ...collectionType.slice(index + 1)]
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Collection Type'}/>
                <CollectionTypeList collectionTypes={this.state.collectionType}
                                    user={this.props.user}
                                    deleteCollectionType={this.deleteCollectionType}
                                    toggleCollectionType={this.toggleCollectionType}/>
            </div>

        );
    }
}

export default CollectionType;
