import React from 'react';
import {Link} from "react-router-dom";

function Switch({}) {
    return (
        <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
        </label>
    );
}

export default Switch;
