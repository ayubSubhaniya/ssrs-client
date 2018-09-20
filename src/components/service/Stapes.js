import React from 'react'

function Stapes({active}) {
    return (
        <div className="container shopping-steps">
        <div className="steps-box">
            <ul className="steps-list">
                <li className={active==1?"current":''}>
                    <div className="steps-detail">
                        <span className="steps-num">1</span>
                        <h3 className="steps-name">Cart</h3>
                    </div>
                </li>
                <li>
                <i className="fa fa-arrow-right icon-arrow" aria-hidden="true"></i>
                </li>
                <li className={active==2?"current":''}>
                    <div className="steps-detail">
                        <span className="steps-num">2</span>
                        <h3 className="steps-name">Order Information</h3>
                    </div>
                </li>
                <li><i className="fa fa-arrow-right icon-arrow" aria-hidden="true"></i></li>
                <li className={active==3?"current":''}>
                    <div className="steps-detail">
                        <span className="steps-num">3</span>
                        <h3 className="steps-name">Complete Payment</h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>)
}

export default Stapes
