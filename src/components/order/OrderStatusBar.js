import {rcartStatus} from "../../constants/status";
import React from "react";
import {isAdmin} from "../../helper/userType";
import {formatDate} from "../../helper/String";

function getStatus(x, y) {
    if (x === y) {
        return 'active'
    } else if (x > y) {
        return 'complete'
    } else
        return 'disabled'
}

function getTransitionDuration(num) {
    if(num === 1 || num === 4)
        return "400ms"
    else
        return "800ms"
}

function getTransitionDelay(num) {
    switch(num){
        case 1: return "0ms";
        case 2: return "350ms";
        case 3: return "1150ms";
        case 4: return "1950ms";
        default: return "1950ms";
    }
}

function Step({curStatus, status, label, showButton, handleClick, btnLabel, time, num}) {
    return (
        <div className={`col-3 bs-wizard-step ${getStatus(curStatus, status)}`}>
            <div className="text-center bs-wizard-stepnum">{label}</div>
            <div className="progress">
                <div className="progress-bar" 
                     style={{"transitionDuration": getTransitionDuration(num), "transitionDelay": getTransitionDelay(num)}}></div>
            </div>
            <div className="bs-wizard-dot"></div>
            <div className="bs-wizard-info text-center">{time}
                <br/>
                {
                    showButton
                        ? (<div className={'btn btn-outline-success ml-2'} onClick={handleClick}>
                            {btnLabel}
                        </div>)
                        : ''
                }
            </div>
        </div>
    )
}

function OrderStatusBar({status, isDelivery, openPaymentCodeModal, statusChangeTime, openCollectionCodeModal, openCourierDetailsModal, user}) {
    return (
        <div className={"row bs-wizard " + (status === rcartStatus.cancelled ? 'cancelled' : '')}
             style={{"borderBottom": "0"}}>
            <Step curStatus={status}
                  status={rcartStatus.placed}
                  time={formatDate(statusChangeTime.placed.time)}
                  num={1}
                  label={'Placed'}/>
            <Step curStatus={status}
                  status={rcartStatus.processing}
                  showButton={status === rcartStatus.placed && isAdmin(user)}
                  handleClick={openPaymentCodeModal}
                  time={formatDate(statusChangeTime.processing.time)}
                  num={2}
                  btnLabel={'Accept Payment'}
                  label={'Processing'}/>
            {
                isDelivery
                    ? <Step curStatus={status}
                            time={formatDate(statusChangeTime.readyToDeliver.time)}
                            status={rcartStatus.readyToDeliver}
                            num={3}
                            label={'Ready To Deliver'}/>
                    : <Step curStatus={status}
                            time={formatDate(statusChangeTime.readyToPickup.time)}
                            num={3}
                            status={rcartStatus.readyToPickup}
                            label={'Ready To Pickup'}/>
            }
            {
                status === rcartStatus.cancelled
                    ? <Step curStatus={status}
                            time={formatDate(statusChangeTime.cancelled.time)}
                            status={rcartStatus.cancelled}
                            num={4}
                            label={'Cancelled'}/>
                    : status === rcartStatus.refunded
                    ? <Step curStatus={status}
                            time={formatDate(statusChangeTime.refunded.time)}
                            num={4}
                            status={rcartStatus.refunded}
                            label={'Refunded'}/>
                    : <Step curStatus={status}
                            time={formatDate(statusChangeTime.completed.time)}
                            showButton={(status === rcartStatus.readyToDeliver || status === rcartStatus.readyToPickup) && isAdmin(user)}
                            handleClick={status === rcartStatus.readyToDeliver ? openCourierDetailsModal : openCollectionCodeModal}
                            num={4}
                            btnLabel={'Complete'}
                            status={rcartStatus.completed}
                            label={'Completed'}/>
            }
        </div>
    )
}

export default OrderStatusBar
