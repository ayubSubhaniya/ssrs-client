import React from "react";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";

export default function TextInputUserName({daiictId,handleChange}) {
    return ( <div className="page-input">
        <div className="title"><i className="fa fa-user-circle"></i> DA-IICT ID
        </div>
        <div className="input-group mb-3" >
            <input type="text" className="form-control"
            
                   placeholder="DA-IICT ID"
                   aria-label="username"
                   value={daiictId}
                   onChange={handleChange}
                   name="daiictId"
                   aria-describedby="basic-addon"/>
        </div>
    </div>)
}
