import React from 'react'

function Stapes({active}) {
    return (
        <div className="container shopping-steps">
        <div className="steps-box">
            <ul className="steps-list">
                <li className={active==1 ? "current":''}>
                    <div className="steps-detail">
                        {/* <button className={"btn " + (active==1 ? "btn-dark" : "btn-outline-dark") + " btn-lg"}> */}
                        <button className={"btn " + (active==1 ? "temp-active" : "temp-inactive") + " btn-lg"}>
                        1. Shopping Cart
                        </button>
                    </div>
                </li>
                <i className="fa fa-chevron-right" ></i>
                <li className={active==2?"current":''}>
                    <div className="steps-detail">
                        {/* <button className={"btn " + (active==2 ? "btn-dark" : "btn-outline-dark") + " btn-lg"}> */}
                        <button className={"btn " + (active==2 ? "temp-active" : "temp-inactive") + " btn-lg"}>
                        2. Order Information
                        </button>
                    </div>
                </li>
                <i className="fa fa-chevron-right" ></i>
                <li className={active==3?"current":''}>
                    <div className="steps-detail">
                        {/* <button className={"btn " + (active==3 ? "btn-dark" : "btn-outline-dark") + " btn-lg"}> */}
                        <button className={"btn " + (active==3 ? "temp-active" : "temp-inactive") + " btn-lg"}>
                        3. Complete Payment
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>)
}

export default Stapes
