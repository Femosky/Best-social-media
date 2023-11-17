import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Jungle() {
    const { setIsInHome, setIsInJungle, setIsInStudio } = useAuth();

    useEffect(() => {
        setIsInHome(false);
        setIsInJungle(true);
        setIsInStudio(false);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    return <div>JUNGLE</div>;
}
