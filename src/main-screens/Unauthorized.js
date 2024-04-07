import React from 'react';

function Unauthorized() {
    const containerStyle = {
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        backgroundColor: '#f4f4f4',
        color: '#555',
        fontFamily: 'Arial, sans-serif'
    };

    const headerStyle = {
        fontSize: '72px',
        color: '#ff4757'
    };

    const paragraphStyle = {
        fontSize: '24px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>403</h1>
            <p style={paragraphStyle}>You do not have permission to view this page.</p>
        </div>
    );
}

export default Unauthorized;
