import * as React from "react";

class ErrorMessage extends React.PureComponent {
    render() {
        if (this.props.clearMessage) {
            return (
                <div className={"alert alert-danger p-2 mt-2 mb-2" + (this.props.message ? '' : ' d-none')}>
                    <button type="button" className="close" onClick={this.props.clearMessage}>
                        &times;</button>
                    <strong>{this.props.message}</strong></div>


            );
        } else {
            return (
                <div className={"alert alert-danger p-2 mt-2 mb-2" + (this.props.message ? '' : ' d-none')}>
                    <strong>{this.props.message}</strong></div>
            );

        }

    }
}

export default ErrorMessage;
