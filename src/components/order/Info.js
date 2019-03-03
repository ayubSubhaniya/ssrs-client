import React from "react";
import TextInfoMod from "./TextInfoMod";

export function PickupInfo({pickup}) {
    if(!pickup)
        return <div>Loading...</div>
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
    if(!delivery)
        return <div>Loading...</div>
    return (
        <React.Fragment>
            <TextInfoMod lable="Name" data={delivery.name}/>
            <TextInfoMod lable="Address" data={" " + delivery.address.line1 +
            ", " + delivery.city + " - " + delivery.pinCode + ", " + delivery.state + ", " + delivery.country}/>
            <TextInfoMod lable="Phone" data={delivery.contactNo}/>
            <TextInfoMod lable="Email" data={delivery.email}/>
            <TextInfoMod lable="Courier Service" data={delivery.courierServiceName}/>
            <TextInfoMod lable="Courier Tacking ID" data={delivery.trackingId}/>
        </React.Fragment>
    )
}
