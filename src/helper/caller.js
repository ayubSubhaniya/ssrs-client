import { domainUrl } from "../config/configuration";
import ReactDOM from "react-dom";
import React from "react";
import Spinner from "../components/Spinner";

const loadSpinner = () => {
    ReactDOM.render(<Spinner open={true}/>, document.getElementById('spinner'));
}

const unloadSpinner = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('spinner'));
}

export const makeCall = ({jobType, urlParams, params={}}) => {

    loadSpinner();

    let endpointUrl = domainUrl +  urlParams;

    const requestObject = {
        method: jobType,
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include'
    };

    if (jobType !== "GET") {
        requestObject.body = JSON.stringify(params);
    } else if (Object.keys(params).length !== 0) {
        endpointUrl += "?";
        Object.entries(params).forEach(([key, value]) => {
            if (value != null) {
                endpointUrl += key + "=" + value + "&";
            }
        });
    }

    return fetch(endpointUrl, requestObject)
        .then(
            (response) => {
                unloadSpinner();
                return response.ok ? response.json() : Promise.reject(response);
            }
        )
        .catch(error => {
            // tslint:disable-next-line:no-console
            unloadSpinner();
            console.error(error);
                return Promise.reject(error);
        });
};
