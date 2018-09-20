import React from 'react'

function Stapes() {
    return (
        <div className="container shopping-steps">
        <div className="steps-box">
            <ul className="steps-list">
                <li className="">
                    <div className="steps-detail">
                        <span className="steps-num">1</span>
                        <h3 className="steps-name">Order Cart</h3>
                    </div>
                </li>
                <li>
                <i className="fa fa-arrow-right icon-arrow" aria-hidden="true"></i>
                </li>
                <li className="current">
                    <div className="steps-detail">
                        <span className="steps-num">2</span>
                        <h3 className="steps-name">Order Information</h3>
                    </div>
                </li>
                <li><i className="fa fa-arrow-right icon-arrow" aria-hidden="true"></i></li>
                <li className="">
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
