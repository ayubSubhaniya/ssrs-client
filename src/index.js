import React, {Component} from "react";
import {render} from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ErrorBoundary from './components/ErrorBoundary'
import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'https://7d739cca183145e6b0c99c3413daf8ec@sentry.io/1291244'
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
