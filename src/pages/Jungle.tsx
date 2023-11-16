import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Jungle() {
    const { isLoggedIn, setIsInHome, setIsInJungle, setIsInStudio } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setIsInHome(false);
        setIsInJungle(true);
        setIsInStudio(false);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    return <div>JUNGLE</div>;
}
