import React, {PureComponent} from 'react';
import NavigationBar from "../NavigationBar";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import "../../styles/ViewProfile.css";

class Myprofile extends PureComponent {
    constructor() {
        super();
        this.state = {
            isEdit: false
        }
    }

    changeIsEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="animated fadeIn">
                    {this.state.isEdit
                        ? <EditProfile user={this.props.user}
                                       updateUser={this.props.updateUser}
                                       changeIsEdit={this.changeIsEdit}/>
                        : <ViewProfile user={this.props.user}
                                       changeIsEdit={this.changeIsEdit}/>}
                </div>
            </div>
        );
    }
}

export default Myprofile;
