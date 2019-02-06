import React, {PureComponent} from 'react';

class Image extends PureComponent {
    render() {
        return (
            <img src={this.props.src}
                 alt="Loading..."
                 className={this.props.className}/>
        );
    }
}

export default Image;
