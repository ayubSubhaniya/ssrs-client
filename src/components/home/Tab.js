import React, {Component} from 'react';
import DataList from "./DataList";

class Tab extends Component{
    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs nav-justified bg-light" role="tablist">
                    <li className="nav-item"><a className="nav-link w-100 text-dark active" data-toggle="tab" href="#menu1"><h4>Notification</h4></a></li>
                    <li className="nav-item"><a className="nav-link w-100 text-dark" data-toggle="tab" href="#menu2"><h4>News</h4></a></li>
                </ul>
                <div className="tab-content">
                    <div id="menu1" className="tab-pane active">
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
