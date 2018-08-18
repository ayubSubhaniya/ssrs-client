import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";

export function fetch(dataName) {
    const that = this;
    const url = domainUrl + '/' + dataName
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED) {
            try {
                const obj = JSON.parse(request.responseText);
                console.log(obj);
                that.setState({
                    [dataName]: obj[dataName]
                })
            } catch (e) {
                console.error(e);
            }
        }
        ;
    };
    request.send();
}
