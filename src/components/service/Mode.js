import React from 'react'

function Mode(props) {
    return (
        <div className={'form-check'}>
            <label>
                <input className="form-check-input"
                       type="checkbox"
                       name={props.mode}
                       checked={props.isChecked}
                       onChange={props.onChange}/>
                {props.text}
            </label>
        </div>
    )
}

export default Mode
