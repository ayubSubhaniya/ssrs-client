import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import {makeCall} from "./caller";
import {handleError} from "./error";
import {OFFLINE, ONLINE} from "../constants/constants";
import {loadSpinner, unloadSpinner} from "./spinner";

export function getCart(callback ,id) {
    makeCall({
        jobType: 'GET',
        urlParams: '/cart/' + (id?id:'')
    })
        .then(callback)
        .catch((error) => {
            handleError(error);
        })
}

export function deleteAddress(id, index){
    makeCall({jobType: 'DELETE', urlParams: '/user/address/' + id}).then((response) => {
        this.setState({
            addresses: [...this.state.addresses.slice(0, index), ...this.state.addresses.slice(index + 1)]
        })
    })
        .catch((error) => {
            handleError(error);
        })
}

export function payOnline(id){
    makeCall({
        jobType: 'PATCH',
        urlParams: '/cart/addPayment/EasyPay/' + (id?id:''),
        params: {
            paymentType: ONLINE
        }
    })
        .then((response) => {
            alert('Please do not refresh the page or press the back button.\nWait while we process your payment. This can take a few minutes.')
            window.open(response.url,"_self");
        })
        .catch((error) => this.onError(error))
};

export function payOffline(id){
    makeCall({
        jobType: 'PATCH',
        urlParams: '/cart/addPayment/' + (id?id:''),
        params: {
            paymentType: OFFLINE
        }
    })
        .then((response) => {
            this.setState({
                isPaymentDone: true
            });
        })
        .catch((error) => this.onError(error))
};

export function asyncFetch(dataName) {
    const that = this;
    loadSpinner();
    const url = domainUrl + '/' + dataName
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status === HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            const obj = JSON.parse(request.responseText);
            that.setState({
                [dataName]: obj[dataName],
            })
        } else {
            handleError(request)
        }
        unloadSpinner();
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
        if (this.status === HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            const obj = JSON.parse(request.responseText);
            fetchedData = obj[dataName];
        } else {
            handleError(request)
        }
    };
    request.send();
    return fetchedData;
}
