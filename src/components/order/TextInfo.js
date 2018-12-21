import React from "react";

function TextInfo({lable, data}) {
    if (data)
        return (<div className='row'>
            <div className='col-3'>{lable}</div>
            <div className='col-9'>{data}</div>
        </div>)
    else
        return ''
}

export default TextInfo
