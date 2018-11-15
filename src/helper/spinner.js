import ReactDOM from "react-dom";
import Spinner from "../components/Spinner";
import React from "react";

export const loadSpinner = () => {
    ReactDOM.render(<Spinner open={true}/>, document.getElementById('spinner'));
}

export const unloadSpinner = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('spinner'));
}

