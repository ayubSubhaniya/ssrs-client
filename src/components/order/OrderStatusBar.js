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

function OrderStatusBar({status, isDelivery}) {
    return (
        <div className="row bs-wizard" style={{"borderBottom": "0"}}>
            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.placed)}`}>
                <div className="text-center bs-wizard-stepnum">Placed</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.processing)}`}>
                <div className="text-center bs-wizard-stepnum">Processing</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            {
                isDelivery ?
                    <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.readyToDeliver)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Deliver</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
                    : ''
            }

            {
                isDelivery ? '' :
                    <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.readyToPickup)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Pickup</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
            }

            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.completed)}`}>
                <div className="text-center bs-wizard-stepnum">Completed</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>
        </div>
    )
}

export default OrderStatusBar
