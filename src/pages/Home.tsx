import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
    const { isLoggedIn, setIsInHome, setIsInJungle, setIsInStudio } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = '/login';
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setIsInHome(true);
        setIsInJungle(false);
        setIsInStudio(false);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    return <div>HOME</div>;
}
