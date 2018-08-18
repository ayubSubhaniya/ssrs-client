import React, {Component} from 'react';
import DataList from "./DataList";

class Tab extends Component {
    constructor() {
        super();
        this.state = {
            currentTab: 'notification'
        }
    }

    changeTab = (e) => {
        this.setState({
            currentTab: e.target.dataset.tab
        })
    }

    render() {
        return (
            <div className="tabmodal">
                <div className='tabname'>
                    <div
                        className={'notification light-blue ' + (this.state.currentTab == 'notification' ? 'focus' : '')}
                        data-tab='notification'
                        onClick={this.changeTab}>
                        Notification
                    </div>
                    <div
                        className={'news light-blue ' + (this.state.currentTab == 'news' ? 'focus' : '')}
                        data-tab='news'
                        onClick={this.changeTab}>
                        News
                    </div>
                </div>
                <DataList data={this.props[this.state.currentTab]}/>
            </div>
        );
    }
}

export default Tab;
