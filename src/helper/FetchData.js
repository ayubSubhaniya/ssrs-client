import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";

export function fetch(dataName,async=true) {
    const that = this;
    const url = domainUrl + '/' + dataName
    var request = new XMLHttpRequest();
    request.open('GET', url, async);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
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
