import React, { useState, useEffect } from 'react';

function Loading() {
    const [loadingText, setLoadingText] = useState('Loading.');

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText(prev => {
                if (prev === 'Loading.') return 'Loading..';
                if (prev === 'Loading..') return 'Loading...';
                return 'Loading.';
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const styles = {
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#C3EAFD',
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
        },
        loadingText: {
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
            color: '#020030',
        }
    };

    return (
        <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>{loadingText}</p>
        </div>
    );
}

export default Loading;