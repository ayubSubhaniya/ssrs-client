import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import ReactDOM from "react-dom";
import Spinner from "../components/Spinner";
import React from "react";

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
            try {
                const obj = JSON.parse(request.responseText);
                console.log(obj);
                that.setState({
                    [dataName]: obj[dataName],
                })
            } catch (e) {
                console.error(e);
            }
        }
        that.setState({
            showSpinner: false
        })
    };
    request.send();
}

export function syncFetch(dataName) {
    const url = domainUrl + '/' + dataName
    console.log(url);
    let fetchedData;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            try {
                const obj = JSON.parse(request.responseText);
                fetchedData = obj[dataName];
            } catch (e) {
                console.error(e);
            }
        }
    };
    request.send();
    return fetchedData;
}
