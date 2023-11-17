import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
    const { setIsInHome, setIsInJungle, setIsInStudio } = useAuth();

    useEffect(() => {
        setIsInHome(true);
        setIsInJungle(false);
        setIsInStudio(false);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    return <div>HOME</div>;
}
