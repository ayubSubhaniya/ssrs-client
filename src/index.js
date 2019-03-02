import React, {Component} from "react";
import {render} from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ErrorBoundary from './components/ErrorBoundary'
import * as Sentry from '@sentry/browser';
import "@babel/polyfill";

Sentry.init({
    dsn: 'https://bab90d004c8644d38d9666d54e5e6528@sentry.io/1406308'
});

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}

class Root extends Component {
    render() {
        return (
            <ErrorBoundary>
                <AlertProvider template={AlertTemplate} {...options}>
                    <App/>
                </AlertProvider>
            </ErrorBoundary>
        )
    }
}

render(<Root/>, document.getElementById('root'))

registerServiceWorker();
