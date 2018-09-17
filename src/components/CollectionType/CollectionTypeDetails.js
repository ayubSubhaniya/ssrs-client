import React, {Component} from 'react';
import _ from "lodash";

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function filterName(x) {
    return _.map(x, o => capitalize(o.name)).join(", ")
}

class CollectionTypeDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {collectionType} = this.props;
        return (
            <div>
                <h5><strong>Description: </strong>
                    {collectionType.description}</h5>
                <h5><strong>Base Charge: </strong>
                    {"₹ " + collectionType.baseCharge}</h5>
            </div>
        );
    }
}

export default CollectionTypeDetails;
