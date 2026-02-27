import React, { useEffect } from 'react';

const AdminLogger = () => {
    useEffect(() => {
        console.log('--- Payload Admin Debug Logger Active ---');

        const handleError = (event) => {
            console.error('--- Global Admin Error Captured ---');
            console.error(event.error);
        };

        const handleUnhandledRejection = (event) => {
            console.error('--- Unhandled Promise Rejection in Admin ---');
            console.error(event.reason);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return null;
};

export default AdminLogger;
