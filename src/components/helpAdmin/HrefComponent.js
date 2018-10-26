import React, {Component} from 'react';

class HrefComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            isEnvelopeOpen: this.props.isEnvelopeOpen,
            name: this.props.name,
            id : this.props.id
        }
        this.onHrefClick = this.onHrefClick.bind(this);
    }

    onHrefClick = () => {
        this.setState((state) => {
            return {
                isEnvelopeOpen : !state.isEnvelopeOpen,
            }
        });
    }

    render() {
        return (
            <div>
                <a href={"#"+this.state.id} data-toggle="collapse" onClick={this.onHrefClick} style={{fontSize:"19px"}}>
                    <i className={this.state.isEnvelopeOpen == true ? "fa fa-toggle-down" : "fa fa-toggle-right" }
                        style ={{color:"black", marginRight:"5px"}}></i>
                    {this.state.name}
                </a>
            </div>
        );
    }
}

export default HrefComponent;
