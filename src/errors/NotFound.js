import React from 'react';
import '../styles/normalize.css'

const NotFound = () =>
    <div className={'error'}>
        <div>
            <h1>Unauthorized
                <small>Error 401</small>
            </h1>
            <p className="lead">The requested resource requires an authentication.</p>
        </div>
    </div>

export default NotFound;
