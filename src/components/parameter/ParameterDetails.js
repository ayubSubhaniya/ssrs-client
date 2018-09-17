import React, {Component} from 'react';
import _ from "lodash";
import {findById} from "../../helper/Search";
import AuthorizedComponent from "../AuthorizedComponent";

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function filterName(x) {
    return _.map(x, o => capitalize(o.name)).join(", ")
}

class ParameterDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {parameter} = this.props;
        return (
            <div>
                <h5><strong>Description: </strong>
                    {parameter.description}</h5>
                <h5><strong>Base Charge: </strong>
                    {"₹ " + parameter.baseCharge}</h5>
            </div>
        );
    }
}

export default ParameterDetails;
