import _ from "lodash";
import {syncFetch} from "../helper/FetchData";

export const DEBITCARD = 'debitCard';
export const NETBANKING = 'netBanking';
export const PAYTM = 'paytm';
export const OFFLINE = 'offline';
export const ONLINE = 'online';

export const paymentMode = [OFFLINE, PAYTM, NETBANKING, DEBITCARD]

export const collectionTypeCategory = {
    DELIVERY: "Delivery",
    PICKUP: "Pickup"
}

export const defaultCart = {
    collectionType: {},
    collectionTypeCost: 0,
    orderId: "",
    orders: [],
    ordersCost: 0,
    requestedBy: "",
    status: 20,
    totalCost: 0,
    _id: "1",
    pickup: '',
    delivery: '',
    statusChangeTime: {
        failed: {},
        invalid: {},
        unplaced: {},
        placed: {},
        paymentComplete: {},
        processing: {},
        readyToDeliver: {},
        readyToPickup: {},
        completed: {},
        onHold: {},
        cancelled: {},
        refunded: {}
    }
}

export const defaultService = {
    isApplicationSpecific: "false",
    isSpecialService: "false",
    name: '',
    description: '',
    maxUnits: '',
    baseCharge: '',
    paymentModes: {
        [OFFLINE]: true,
        [ONLINE]: true
    },
    allBatches: 'true',
    allUserTypes: 'true',
    allProgrammes: 'true',
    collectionType: [],
    parameter: []
}

export const defaultUser = {
    addresses: [],
    contactNo: "Loading",
    createdOn: "Loading",
    daiictId: "Loading",
    isActive: true,
    name: {},
    primaryEmail: "Loading",
    requestedServices: [],
    userType: "Loading",
    userInfo: {
        user_adr_city: "Loading",
        user_adr_contact_name: "Loading",
        user_adr_country: "Loading",
        user_adr_district: "Loading",
        user_adr_emailid: "Loading",
        user_adr_line1: "Loading",
        user_adr_line2: "Loading",
        user_adr_mobileno: "Loading",
        user_adr_pincode: "Loading",
        user_adr_state: "Loading",
        user_adr_telno: "Loading",
        user_batch: "Loading",
        user_email_id: "Loading",
        user_first_name: "Loading",
        user_inst_id: "Loading",
        user_last_name: "Loading",
        user_programme: "Loading",
        user_sex: "Loading",
        user_status: "Loading",
        user_type: "Loading",
        _id: "Loading"
    }
}
