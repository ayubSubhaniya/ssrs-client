import React, { Component } from 'react';
import News from './News';
import Notification from './Notification';

class Tab extends Component {
    constructor(){
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
                className={'notification ' + (this.state.currentTab=='notification'?'focus':'')}
                data-tab='notification'
                onClick={this.changeTab}>
                Notification
            </div>
            <div 
                className={'news ' + (this.state.currentTab=='news'?'focus':'')}
                data-tab='news'
                onClick={this.changeTab}>
                News
            </div>
        </div>
       { 
           
           (this.state.currentTab=='notification'?
           <Notification notification={this.props.notification}/>:
           <News news={this.props.news}/>)
       }
        </div>
    );
  }
}

export default Tab;
