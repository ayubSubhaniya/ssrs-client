import React, {Component} from 'react';
import DataList from "./DataList";

class Tab extends Component{
    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs nav-justified">
                    <li className="active"><a data-toggle="tab" href="#menu1"><h4>News</h4></a></li>
                    <li><a data-toggle="tab" href="#menu2"><h4>Notification</h4></a></li>
                </ul>
                <div className="tab-content">
                    <div id="menu1" className="tab-pane fade in active">
                        <DataList data={this.props.notification}/>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                        <DataList data={this.props.news}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tab;
