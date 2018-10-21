import {rcartStatus} from "../../constants/status";
import React from "react";

function getStatus(x, y) {
    if (x == y) {
        return 'active'
    } else if (x > y) {
        return 'complete'
    } else
        return 'disabled'
}

function Step({curStatus, status, label}) {
    retrun(
        <div className={`col-3 bs-wizard-step ${getStatus(curStatus, status)}`}>
            <div className="text-center bs-wizard-stepnum">{label}</div>
            <div className="progress">
                <div className="progress-bar"></div>
            </div>
            <div className="bs-wizard-dot"></div>
        </div>
    )
}

function OrderStatusBar({status, isDelivery}) {
    return (
        <div className="row bs-wizard" style={{"borderBottom": "0"}}>
            <Step curStatus={status}
                  status={rcartStatus.placed}
                  label={'Placed'}/>
            <Step curStatus={status}
                  status={rcartStatus.processing}
                  label={'Processing'}/>
            {
                isDelivery
                    ? <Step curStatus={status}
                            status={rcartStatus.readyToDeliver}
                            label={'Ready To Deliver'}/>
                    : <Step curStatus={status}
                            status={rcartStatus.readyToPickup}
                            label={'Ready To Pickup'}/>
            }
            <Step curStatus={status}
                  status={rcartStatus.completed}
                  label={'Completed'}/>
        </div>
    )
}

export default OrderStatusBar
