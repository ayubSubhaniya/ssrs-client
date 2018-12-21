import React, {Component} from "react";
import _ from 'lodash'

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function filterName(x) {
    return _.map(x, o => o.name).join(", ")
}

function TextInfo({lable, data}) {
    if (data)
        return (<h5 className='row'>
            <strong className='col-2'>{lable}</strong>
            <div className='col-10'>{data}</div>
        </h5>)
    else
        return ''
}

class ServiceDetails extends Component {
    render() {
        const {service} = this.props;
        return (
            <div>
                <TextInfo lable={'Description'} data={service.description}/>
                <TextInfo lable={'Base Charge'} data={"Rs. " + service.baseCharge}/>
                <TextInfo lable={'Maximum Units'} data={service.maxUnits}/>
                <TextInfo lable={'Payment Modes'}
                          data={_.map(service.availablePaymentModes, (x) => capitalize(x)).join(", ")}/>
                <TextInfo lable={'Parameters'}
                          data={service.availableParameters.length > 0 ? filterName(service.availableParameters) : 'None'}/>
                <TextInfo lable={'Collection Types'}
                          data={service.collectionTypes.length > 0 ? filterName(service.collectionTypes) : 'None'}/>
            </div>
        )
    }
}

export default ServiceDetails
