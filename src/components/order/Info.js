import React from "react";
import TextInfo from "./TextInfo";

export function PickupInfo({pickup}) {
    return (
        <React.Fragment>
            <TextInfo lable="Collection Code" data={pickup.collectionCode}/>
            <TextInfo lable="Name" data={pickup.name}/>
            <TextInfo lable="DAIICT ID" data={pickup.daiictId}/>
            <TextInfo lable="Phone" data={pickup.contactNo}/>
            <TextInfo lable="Email" data={pickup.email}/>
        </React.Fragment>
    )
}

export function DeliveryInfo({delivery}) {
    return (
        <React.Fragment>
            <TextInfo lable="Name" data={delivery.name}/>
            <TextInfo lable="Address" data={" " + delivery.address.line1 +
            ", " + delivery.city + " - " + delivery.pinCode + ", " + delivery.state + ", " + delivery.country}/>
            <TextInfo lable="Phone" data={delivery.contactNo}/>
            <TextInfo lable="Email" data={delivery.email}/>
        </React.Fragment>
    )
}
