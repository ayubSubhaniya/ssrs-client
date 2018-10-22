import {rcartStatus} from "../../constants/status";
import React from "react";
import {isSuperAdmin} from "../../helper/userType";
import {formatDate} from "../../helper/String";

function getStatus(x, y) {
    if (x == y) {
        return 'active'
    } else if (x > y) {
        return 'complete'
    } else
        return 'disabled'
}

function Step({curStatus, status, label, showButton, handleClick, btnLabel, time}) {
    return (
        <div className={`col-3 bs-wizard-step ${getStatus(curStatus, status)}`}>
            <div className="text-center bs-wizard-stepnum">{label}</div>
            <div className="progress">
                <div className="progress-bar"></div>
            </div>
            <div className="bs-wizard-dot"></div>
            <div className="bs-wizard-info text-center">{time}
                <br/>
                {
                    showButton
                        ? (<div className={'btn btn-success ml-2'} onClick={handleClick}>
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
        <div className={"row bs-wizard "+ (status===rcartStatus.cancelled?'cancelled':'')} style={{"borderBottom": "0"}}>
            <Step curStatus={status}
                  status={rcartStatus.placed}
                  time={formatDate(statusChangeTime.placed.time)}
                  label={'Placed'}/>
            <Step curStatus={status}
                  status={rcartStatus.processing}
                  showButton={status === rcartStatus.placed && isSuperAdmin(user)}
                  handleClick={openPaymentCodeModal}
                  time={formatDate(statusChangeTime.processing.time)}
                  btnLabel={'Accept Payment'}
                  label={'Processing'}/>
            {
                isDelivery
                    ? <Step curStatus={status}
                            time={formatDate(statusChangeTime.readyToDeliver.time)}
                            status={rcartStatus.readyToDeliver}
                            label={'Ready To Deliver'}/>
                    : <Step curStatus={status}
                            time={formatDate(statusChangeTime.readyToPickup.time)}
                            status={rcartStatus.readyToPickup}
                            label={'Ready To Pickup'}/>
            }
            {
                status === rcartStatus.cancelled
                    ? <Step curStatus={status}
                            time={formatDate(statusChangeTime.cancelled.time)}
                            status={rcartStatus.cancelled}
                            label={'Cancelled'}/>
                    : <Step curStatus={status}
                            time={formatDate(statusChangeTime.completed.time)}
                            showButton={(status === rcartStatus.readyToDeliver || status === rcartStatus.readyToPickup) && isSuperAdmin(user)}
                            handleClick={status === rcartStatus.readyToDeliver ? openCourierDetailsModal : openCollectionCodeModal}
                            btnLabel={'Complete'}
                            status={rcartStatus.completed}
                            label={'Completed'}/>
            }
        </div>
    )
}

export default OrderStatusBar
