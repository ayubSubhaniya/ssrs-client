import React from "react";
import TextInfo from "./TextInfo";
import TextInfoMod from "./TextInfoMod";

export function PickupInfo({pickup}) {
    return (
        <React.Fragment>
            <TextInfoMod lable="Collection Code" data={pickup.collectionCode}/>
            <TextInfoMod lable="Name" data={pickup.name}/>
            <TextInfoMod lable="DAIICT ID" data={pickup.daiictId}/>
            <TextInfoMod lable="Phone" data={pickup.contactNo}/>
            <TextInfoMod lable="Email" data={pickup.email}/>
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
            <TextInfo lable="Courier Service" data={delivery.courierServiceName}/>
            <TextInfo lable="Courier Tacking ID" data={delivery.trackingId}/>
        </React.Fragment>
    )
}
