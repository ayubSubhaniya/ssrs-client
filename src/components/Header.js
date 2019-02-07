import React, {PureComponent} from 'react';

class Header extends PureComponent {
    render() {
        return (
            <h2 className='header mb-3 mt-3'>{this.props.title}</h2>
        );
    }
}

export default Header;
