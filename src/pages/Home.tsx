import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeLayout } from '../layouts/HomeLayout';
import { JungleLayout } from '../layouts/JungleLayout';
import { StudioLayout } from '../layouts/StudioLayout';

export function Home() {
    const { isLoggedIn, isInHome, isInJungle, isInStudio } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {isLoggedIn ? (
                <>
                    {isInHome && <HomeLayout />}
                    {isInJungle && <JungleLayout />}
                    {isInStudio && <StudioLayout />}
                </>
            ) : (
                // <>{(window.location.href = '/')}</>
                <>{navigate('/')}</>
            )}
        </>
    );
}
