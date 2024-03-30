import React, { useState, useEffect } from 'react';

const InactivityDetector = ({ timeout, onInactive }) => {
    const [inactive, setInactive] = useState(false);

    useEffect(() => {
        let timeoutId;

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setInactive(true);
                if (onInactive) {
                    onInactive();
                }
            }, timeout);
        };

        const clearTimer = () => {
            clearTimeout(timeoutId);
            setInactive(false);
            resetTimer();
        };

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        events.forEach(event => {
            window.addEventListener(event, clearTimer);
        });

        resetTimer();

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, clearTimer);
            });
            clearTimeout(timeoutId);
        };

    }, [timeout, onInactive]);

    return <>{inactive}</>;
};

export default InactivityDetector;
