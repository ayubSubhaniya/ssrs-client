import _ from "lodash";

export function handleChange({target}) {
    this.setState({
        [target.name]: target.value
    })
}

export function handlePaymentModeChange({target}) {
    const paymentModes = this.state.paymentModes
    paymentModes[target.name] = !paymentModes[target.name]
    this.setState({
        paymentModes
    });
}

export function handleArrayUpdate({target}) {
    const newArray = this.state[target.name];
    newArray[target.dataset.index].isSelected = !newArray[target.dataset.index].isSelected
    this.setState({
        [target.name]: newArray
    })
}

function getSelectedName(obj) {
    return _.map(_.filter(obj, ({isSelected}) => isSelected), 'name')
}

function getSelectedID(obj) {
    return _.map(_.filter(obj, ({isSelected}) => isSelected), '_id')
}

export function setIsSelected(obj, value) {
    return _.map(obj, (o) => {
        return Object.assign({}, o, {isSelected: value});
    })
}

export function getServiceFromState() {
    const updatedService = {
        name: this.state.name,
        description: this.state.description,
        isSpecialService: this.state.isSpecialService,
        maxUnits: this.state.maxUnits,
        baseCharge: this.state.baseCharge,
        availablePaymentModes: _.filter(Object.keys(this.state.paymentModes), (key) => this.state.paymentModes[key]),
        collectionTypes: getSelectedID(this.state.collectionType),
        availableParameters: getSelectedID(this.state.parameter),
        allowedUserTypes: getSelectedName(this.state.userTypes),
        allowedUserStatus: getSelectedName(this.state.userStatus),
        allowedProgrammes: getSelectedName(this.state.programmes),
        allowedBatches: getSelectedName(this.state.batches),
        specialServiceUsers: this.state.specialServiceUsers
    }
    return updatedService;
}
