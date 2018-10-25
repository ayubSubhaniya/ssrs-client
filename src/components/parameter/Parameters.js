import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import ParameterList from "./ParameterList";
import {makeCall} from "../../helper/caller";


class Parameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parameter: []
        }
    }

    componentDidMount() {
        this.getAllParameter();
    }

    getAllParameter = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/parameter'
        })
            .then((response) => {
                this.setState({
                    parameter: response.parameter
                })
            })
    }

    toggleParameter = (index) => {
        const parameter = this.state.parameter[index];
        makeCall({
            jobType: 'PATCH',
            urlParams: '/parameter/' + this.parameter._id,
            params: {isActive: !parameter.isActive}
        })
            .then((response) => {
                const parameterList = this.state.parameter;
                parameterList[index] = response.parameter;
                this.setState({
                    parameter: parameterList,
                });
            })
    };

    deleteParameter = (index) => {
        makeCall({
            jobType: 'DELETE',
            urlParams: '/parameter/' + this.state.parameter[index]._id
        })
            .then(() => {
                const parameter = this.state.parameter;
                this.setState({
                    parameter: [...parameter.slice(0, index), ...parameter.slice(index + 1)]
                })
            })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Parameters'}/>
                <ParameterList parameters={this.state.parameter}
                               user={this.props.user}
                               toggleParameter={this.toggleParameter}
                               deleteParameter={this.deleteParameter}/>
            </div>

        );
    }
}

export default Parameters;
