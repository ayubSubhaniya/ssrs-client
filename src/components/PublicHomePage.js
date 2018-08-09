import React, {Component} from 'react';
import '../styles/App.css';
import logo from '../images/dalogo.jpg'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Image from '../components/Image'
import Background from '../js/background';
import Hyperlink from '../components/Hyperlink'
import ForgotPopUp from '../components/ForgotPopUp'
import '../styles/App.css';


class PublicHomePage extends Component {
    constructor() {
        super();
        this.state = {
            current: 'Login',
        }
    }

    changeComponent = () => {
        this.setState({
            current: this.state.current == 'Login' ? 'Signup' : 'Login'
        })
    }

    componentDidMount() {
        Background();
    }

    render() {
        return (
            <div className="App">
                <canvas id="canvas"></canvas>
                <div className="loginbox">
                    <Image src={logo} className={'dalogo'}/>
                    {
                        this.state.current == 'Login' ? <Login OnLogin={this.props.handleLogin}/> : <Signup/>
                    }
                    <Hyperlink text={this.state.current === "Login" ? 'Signup' : 'Login'}
                               handleClick={this.changeComponent}/>
                    <br/>
                </div>
                <ForgotPopUp/>
            </div>
        );
    }
}

export default PublicHomePage;
