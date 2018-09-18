import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import CollectionTypeList from "./CollectionTypeList";
import {asyncFetch} from "../../helper/FetchData";
import Spinner from "../Spinner";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";

class CollectionType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
        }
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
            if (this.status == HttpStatus.OK) {
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

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Collection Type'}/>
                <CollectionTypeList collectionTypes={this.state.collectionType}
                                    user={this.props.user}
                                    toggleCollectionType={this.toggleCollectionType}/>
                <Spinner open={this.state.showSpinner}/>
            </div>

        );
    }
}

export default CollectionType;
