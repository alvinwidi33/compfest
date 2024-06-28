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

    return (
        <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>{loadingText}</p>
        </div>
    );
}

const styles = {
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        backgroundColor: '#C3EAFD',
    },
    loadingText: {
        fontSize: '24px',
        fontFamily: 'Poppins, sans-serif',
        color: '#020030',
    }
};

export default Loading;