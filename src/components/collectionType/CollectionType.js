import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import CollectionTypeList from "./CollectionTypeList";
import {asyncFetch} from "../../helper/FetchData";
import Spinner from "../Spinner";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import {collectionType} from "../../test/CollectionType";

class CollectionType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            collectionType: []
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('collectionType');
    }

    toggleCollectionType = (index) => {
        this.setState({
            showSpinner: true
        });
        const collectionType = this.state.collectionType[index];
        const that = this;
        const url = domainUrl + '/collectionType/changeStatus/' + collectionType._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const collectionTypeList = that.state.collectionType;
                collectionTypeList[index] = response.collectionType;
                that.setState({
                    collectionType: collectionTypeList,
                    showSpinner: false
                });
            }
        };
        request.send(JSON.stringify({isActive: !collectionType.isActive}));
    };

    deleteCollectionType = (index) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/collectionType/' + this.state.collectionType[index]._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const collectionType = that.state.collectionType;
                that.setState({
                    collectionType: [...collectionType.slice(0,index),...collectionType.slice(index+1)]
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
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
                <Spinner open={this.state.showSpinner}/>
            </div>

        );
    }
}

export default CollectionType;
