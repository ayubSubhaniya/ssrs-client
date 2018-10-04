import {OFFLINE, DEBITCARD, NETBANKING, PAYTM} from "../constants/PaymentMode";
import {collectionType, parameter} from "./CollectionType";

export const Service = [
    {
        "_id": "5b6a90c895f9504820057e8b",
        "name": "Transcript",
        "description": "Get transcript",
        "createdOn": "2018-08-08T06:42:16.947Z",
        "createdBy": 201501433,
        "isApplicationSpecific": false,
        "isAvailableForAlumni": false,
        "isCourierAvailable": false,
        "isSpecialService": false,
        "isActive": true,
        "maxUnits": 1,
        "baseCharge": 50,
        "availableParameters": parameter,
        "specialServiceUsers": [],
        "collectionType": collectionType,
        "parameter": parameter,
        "paymentModes": {
            "debitCard": true,
            "netBanking": true,
            "paytm": true,
            "cashOnDelivery": true
        }
    },
    {
        "_id": "5b6d5cac32897e478cddb59f",
        "name": "Transcript",
        "description": "Get transcript",
        "createdOn": "2018-08-10T09:36:44.268Z",
        "createdBy": 201501433,
        "isApplicationSpecific": false,
        "isAvailableForAlumni": false,
        "isCourierAvailable": false,
        "isSpecialService": false,
        "isActive": false,
        "maxUnits": 1,
        "baseCharge": 50,
        "availableParameters": [],
        "specialServiceUsers": [],
        "paymentModes": {
            "debitCard": false,
            "netBanking": false,
            "paytm": false,
            "cashOnDelivery": false
        }
    },
    {
        "_id": "5b6dc2c31ab4601198b9e356",
        "name": "Transcript",
        "description": "Get transcript",
        "createdOn": "2018-08-10T16:52:19.849Z",
        "createdBy": 201501433,
        "isApplicationSpecific": false,
        "isAvailableForAlumni": false,
        "isCourierAvailable": false,
        "isSpecialService": false,
        "isActive": true,
        "maxUnits": 1,
        "baseCharge": 50,
        "availableParameters": [],
        "specialServiceUsers": [],
        "paymentModes": {
            "debitCard": false,
            "netBanking": false,
            "paytm": false,
            "cashOnDelivery": false
        }
    }
]
