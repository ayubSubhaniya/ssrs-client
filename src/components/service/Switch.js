import React from 'react';

class Switch extends React.Component{
    render() {
        const {handleClick,index,isChecked,isDisabled} = this.props
        return (
            <label className="switch ml-2 mr-2 mb-0">
                <input type="checkbox" disabled={isDisabled} checked={isChecked} onChange={(event) => handleClick(index,event)}/>
                <span className="slider round"></span>
            </label>
        );
    }
}

export default Switch;
