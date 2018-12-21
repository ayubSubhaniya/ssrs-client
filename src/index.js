import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { render } from 'react-dom'

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }
class Root extends Component  {
    render() {
      return (
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      )
    }
  }
   
  render(<Root />, document.getElementById('root'))

registerServiceWorker();
