import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Background from './js/background';

ReactDOM.render(<App />, document.getElementById('root'));
Background();

registerServiceWorker();
