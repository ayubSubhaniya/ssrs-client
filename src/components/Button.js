import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
        <button onClick={this.props.handleClick}>{this.props.text}</button>
    );
  }
}

export default Button;
