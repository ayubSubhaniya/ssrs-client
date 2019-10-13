import React, {PureComponent} from 'react';

class SubDevs extends PureComponent {
    render() {
        const {name, batch, contribution} = this.props.data;
        console.log(this.props.data);
        return(
            <div className="other-contribution-card">
                <div>
                    <span className="other-contributor-name">{name}</span>
                    <span className="other-contributor-batch">(Batch-{batch})</span>
                </div>
                <div><span className="other-contributor-contribution">{contribution}</span></div>
            </div>
        );
    }
}

export default SubDevs;