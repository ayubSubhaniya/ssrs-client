import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
        <img src={this.props.src} class="dalogo" />
    );
  }
}

export default Image;
