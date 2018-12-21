import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <h2 className='header mb-3 mt-3'>{this.props.title}</h2>
        );
    }
}

export default Header;
