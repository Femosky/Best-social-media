import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isInLoggedInPath = currentPath === '/home' || currentPath === '/jungle' || currentPath === '/studio';

    const { isLoggedIn, isInHome, setIsInHome, isInJungle, setIsInJungle, isInStudio, setIsInStudio } = useAuth();

    const [isMedium, setIsMedium] = useState(false);

    function isScreenMedium() {
        return window.innerWidth < 1024;
    }

    function homeToggle() {
        setIsInHome(true);
        setIsInJungle(false);
        setIsInStudio(false);
        navigate('/home');
    }

    function jungleToggle() {
        setIsInHome(false);
        setIsInJungle(true);
        setIsInStudio(false);
        navigate('/jungle');
    }

    function studioToggle() {
        setIsInHome(false);
        setIsInJungle(false);
        setIsInStudio(true);
        navigate('/studio');
    }

    useEffect(() => {
        function handler() {
            if (isScreenMedium()) {
                setIsMedium(true);
            } else {
                setIsMedium(false);
            }
        }

        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);

    useEffect(() => {
        setIsMedium(isScreenMedium());
    }, [isLoggedIn, isInLoggedInPath]);

    return (
        <>
            {isMedium && isLoggedIn && isInLoggedInPath && (
                <div
                    className={`flex fixed bottom-0 z-[990] w-full min-w-[230px] bg-white shadow-[0px_-1px_2.4px_-1px_rgba(0,0,0,0.25)] h-[4.375rem] py-4 font-plusJakarta`}
                >
                    <section className="flex justify-center w-full gap-6">
                        <Button
                            className="w-1/3 xxs:w-auto"
                            onClick={homeToggle}
                            variant={`${isInHome ? 'dark' : 'light'}`}
                        >
                            Home
                        </Button>
                        <Button onClick={jungleToggle} variant={`${isInJungle ? 'dark' : 'light'}`}>
                            Jungle
                        </Button>
                        <Button onClick={studioToggle} variant={`${isInStudio ? 'dark' : 'light'}`}>
                            Studio
                        </Button>
                    </section>
                </div>
            )}
        </>
    );
}
