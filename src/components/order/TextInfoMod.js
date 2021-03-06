import React from "react";

function TextInfoMod({lable, data}) {
    if (data)
        return (<div className='row mr-0' style={{"fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,sans-serif", "fontSize": "14px"}}>
            <div id="position_lable">{lable}</div>
            <div id="position_data">{data}</div>
        </div>)
    else
        return ''
}

export default TextInfoMod
