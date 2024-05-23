import React from 'react';

export const BlocksList = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            right: '0',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            padding: '20px',
            zIndex: '1000',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
        </div>
    );
}
