import React, { Component } from 'react';
import '../styles/App.css';
import logo from '../images/dalogo.jpg'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Image from '../components/Image'
import Button from '../components/Button'

class App extends Component {
  constructor(){
    super();
    this.state = {
        current: 'Login'
    }
  }

  changeComponent = () => {
    this.setState({
      current: this.state.current=='Login'?'Signup':'Login'
    })
  }


  render() {
    return (
      <div className="App">
        <canvas id="canvas"></canvas>
        <div class="loginbox">
        <Image src={logo}/>
        {
          this.state.current=='Login'?<Login/>:<Signup/>
        }
        
        <Button text={this.state.current=="Login"?'Signup':'Login'} handleClick={this.changeComponent}/>
      </div>
      </div>
    );
  }
}

export default App;
