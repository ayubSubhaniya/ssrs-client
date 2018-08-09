import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <h2 className='header'>{this.props.title}</h2>
    );
  }
}

export default Header;
