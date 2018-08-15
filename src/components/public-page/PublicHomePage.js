import React, {Component} from 'react';
// images
import logo from '../../images/dalogo.jpg'
// components
import Login from './Login'
import Signup from './Signup'
import Image from '../Image'
import Background from '../../js/background';
import Hyperlink from './Hyperlink'
import ForgotPopUp from './ForgotPopUp'


class PublicHomePage extends Component {
    changeComponent = () => {
        this.setState({
            current: this.state.current == 'Login' ? 'Signup' : 'Login'
        })
    }

    constructor() {
        super();
        this.state = {
            current: 'Login',
        }
    }

    componentDidMount() {
        Background();
    }

    render() {
        return (<div className="App">
                <canvas id="canvas"/>
                <div className="loginbox">
                    <Image src={logo} className={'dalogo'}/>
                    {
                        this.state.current == 'Login' ?
                            <Login
                                OnLogin={this.props.handleLogin}/> :
                            <Signup/>
                    }
                    <Hyperlink text={this.state.current === "Login" ? 'Signup' : 'Login'}
                               handleClick={this.changeComponent}/>
                    <br/>
                </div>
                <ForgotPopUp/>
            </div>
        )
    }
}

export default PublicHomePage;
