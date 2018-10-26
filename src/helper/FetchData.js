import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import React from "react";
import {makeCall} from "./caller";
import {handleError} from "./error";

export function getCart(callback) {
    makeCall({
        jobType: 'GET',
        urlParams: '/cart'
    })
        .then(callback)
        .catch((error) => {
            handleError(error);
        })
}

export function asyncFetch(dataName) {
    const that = this;
    that.setState({
        showSpinner: true
    })
    const url = domainUrl + '/' + dataName
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            const obj = JSON.parse(request.responseText);
            that.setState({
                [dataName]: obj[dataName],
            })
        } else {
            handleError(request)
        }
        that.setState({
            showSpinner: false
        })
    };
    request.send();
}

export function syncFetch(dataName) {
    const url = domainUrl + '/' + dataName
    let fetchedData;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            const obj = JSON.parse(request.responseText);
            fetchedData = obj[dataName];
        } else {
            handleError(request)
        }
    };
    request.send();
    return fetchedData;
}
