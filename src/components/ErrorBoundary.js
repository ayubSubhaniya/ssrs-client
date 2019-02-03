import React from 'react'
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div className='m-4'>
                    <h2>It looks like we're having issues.</h2>
                     <h3>Our team has been notified. If you'd like to help, tell us what happened below.</h3>
                    <button onClick={() => Sentry.showReportDialog()} className='btn btn-outline-primary'>Report feedback</button>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary