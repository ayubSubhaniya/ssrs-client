import React from "react";

export default function TextInputUserName({daiictId,handleChange}) {
    return ( <div className="page-input">
        <div className="title"><i
            className="material-icons">account_box</i> DA-IICT ID
        </div>
        <div className="input-group mb-3">
            <input type="text" className="form-control"
                   placeholder="DA-IICT ID"
                   aria-label="username"
                   value={daiictId}
                   onChange={handleChange}
                   name="daiictId"
                   aria-describedby="basic-addon"/>
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon">@daiict.ac.in</span>
            </div>
        </div>
    </div>)
}
