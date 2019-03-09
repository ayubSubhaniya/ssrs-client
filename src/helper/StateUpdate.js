import _ from "lodash";
import {specialServiceUsers} from "../constants/constants";

export function handleChange({target}) {
    this.setState({
        [target.name]: target.value
    })
}

export function handlePaymentModeChange({target}) {
    const paymentModes = this.state.paymentModes;
    paymentModes[target.name] = !paymentModes[target.name];
    this.setState({
        paymentModes
    });
}

export function handleArrayUpdate(e) {
    const name = e.target.name;
    const index = e.target.dataset.index;
    const newArray = [...this.state[name]];
    newArray[index].isSelected = !newArray[index].isSelected;
    this.setState({
        [name]: newArray
    })
}

function getSelectedName(obj) {
    // noinspection JSCheckFunctionSignatures
    return _.map(_.filter(obj, ({isSelected}) => isSelected), 'name')
}

function getSelectedID(obj) {
    // noinspection JSCheckFunctionSignatures
    return _.map(_.filter(obj, ({isSelected}) => isSelected), '_id')
}

export function setIsSelected(obj, value) {
    return _.map(obj, (o) => {
        return Object.assign({}, o, {isSelected: value});
    })
}

export function getServiceFromState() {
    return {
        name: this.state.name,
        description: this.state.description,
        isSpecialService: this.state.isSpecialService,
        maxUnits: this.state.maxUnits,
        baseCharge: this.state.baseCharge,
        availablePaymentModes: _.filter(Object.keys(this.state.paymentModes), (key) => this.state.paymentModes[key]),
        collectionTypes: getSelectedID(this.state.collectionType),
        availableParameters: getSelectedID(this.state.parameter),
        allowedUserTypes: this.state.allUserTypes === 'true' ? ['*'] : getSelectedName(this.state.userTypes),
        allowedUserStatus: this.state.allUserTypes === 'true' ? ['*'] : getSelectedName(this.state.userStatus),
        allowedProgrammes: this.state.allProgrammes === 'true' ? ['*'] : getSelectedName(this.state.programmes),
        allowedBatches: this.state.allBatches === 'true' ? ['*'] : getSelectedName(this.state.batches),
        specialServiceUsers: this.state.specialServiceUsers
    };
}

export function specialServiceFileHandler(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i][specialServiceUsers])
            arr.push(data[i][specialServiceUsers]);
    }

    if (arr.length > 0) {
        arr.sort();
        this.setState({
            specialServiceUsers: arr
        });
        this.props.alert.success('List uploaded successfully.')
    } else {
        this.props.alert.error('Error in upload. Please check the file.');
    }
}