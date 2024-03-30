import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useSaveLocation() {
    const location = useLocation();

    useEffect(() => {
        sessionStorage.setItem('lastLocation', location.pathname + location.search);
    }, [location]);
}
