import React, { Component } from 'react';

class Button extends Component {

  render() {
    let style = {
      fontSize: '15px',
    }
    return (
        <a href="#" onClick={this.props.handleClick} style= {style}>{this.props.text}</a>
    );
  }
}

export default Button;
