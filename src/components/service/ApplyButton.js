import React from 'react'

class ApplyButton extends React.Component {
    render() {
        const {service, index, handleClick} = this.props;
        return (
            <div className={'btn btn-success btn-large ml-2 mr-2'} onClick={() => handleClick(service)}>
                Apply
            </div>
        )
    }
}

export default ApplyButton
