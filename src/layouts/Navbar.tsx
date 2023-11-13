import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavbar } from '../contexts/NavbarContext';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Navbar() {
    const navigate = useNavigate();
    // const location = useLocation();
    // const currentPath = location.pathname;

    const [isLoading, setIsLoading] = useState(false);

    const { isSmall, setIsSmall } = useNavbar();
    const {
        setIsLoginToggle,
        setIsSignupToggle,
        isLoggedIn,
        setIsLoggedIn,
        isInHome,
        setIsInHome,
        isInJungle,
        setIsInJungle,
        isInStudio,
        setIsInStudio,
    } = useAuth();

    // Sign up and login switch toggles

    function loginSwitchToggle() {
        setIsLoginToggle(true);
        setIsSignupToggle(false);
    }

    function signupSwitchToggle() {
        setIsSignupToggle(true);
        setIsLoginToggle(false);
    }

    function loginToggle() {
        setIsLoggedIn(true);

        setIsInHome(true);
        setIsInJungle(false);
        setIsInStudio(false);
    }

    function reloadPage() {
        window.location.reload();
    }

    async function logout() {
        // setIsLoading(false);

        try {
            const apirUrl = 'https://socialmediaapp-ugrr.onrender.com/logout';

            const res = await axios.get(apirUrl);

            console.log('Success: ', res.data);

            if (res.data.active === false) {
                setIsLoading(false);
                setIsLoggedIn(false);
            } else {
                console.log('User still logged in');
                reloadPage();
            }
            setIsLoggedIn(false);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false);
            navigate('*');

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage === 'User not authenticated') {
                    console.log('error: ', errorMessage);
                    console.log('user indeed not authenticated');
                } else {
                    console.log('error: ', error.response);
                }
            } else {
                console.log('error: ', error.response);
            }
        }
    }

    function logoutToggle() {
        logout();
    }

    function homeToggle() {
        setIsInHome(true);
        setIsInJungle(false);
        setIsInStudio(false);
    }

    function jungleToggle() {
        setIsInHome(false);
        setIsInJungle(true);
        setIsInStudio(false);
    }

    function studioToggle() {
        setIsInHome(false);
        setIsInJungle(false);
        setIsInStudio(true);
    }

    // Screen size behaviour

    function toggle() {
        setIsSmall((prev) => !prev);
    }

    function close() {
        setIsSmall(false);
    }

    function isScreenMedium() {
        return window.innerWidth < 1024;
    }

    useEffect(() => {
        function handler() {
            if (!isScreenMedium()) setIsSmall(false);
        }

        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [setIsSmall]);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isSmall);

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isSmall]);

    return (
        <>
            <div
                className={`flex w-full h-[4.5rem] justify-between items-center bg-white py-4 px-[50px] sticky top-0 left-0 right-0 font-plusJakarta min-w-[230px] | md:px-[72px] ${
                    isSmall && 'overscroll-none overflow-hidden'
                }`}
            >
                <div className="">
                    <Link to="/" reloadDocument>
                        <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">BEST</h1>
                    </Link>
                </div>

                {/* Managing the logged in State */}

                <div className="hidden gap-4 lg:flex">
                    {!isLoggedIn && (
                        <Button onClick={loginToggle} variant="dark">
                            Login
                        </Button>
                    )}

                    {isLoggedIn && (
                        <Button
                            onClick={() => {
                                setIsLoading(true);
                                logoutToggle();
                            }}
                            className="flex justify-center items-center"
                            variant="hot"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner /> Logging out
                                </>
                            ) : (
                                'Logout'
                            )}
                        </Button>
                    )}

                    <Button onClick={() => navigate('/home')} variant="dark">
                        Home
                    </Button>
                </div>

                {isLoggedIn && !isSmall && (
                    <>
                        <section className="hidden lg:flex gap-6">
                            <Button onClick={homeToggle} variant={`${isInHome ? 'dark' : 'light'}`}>
                                Home
                            </Button>
                            <Button onClick={jungleToggle} variant={`${isInJungle ? 'dark' : 'light'}`}>
                                Jungle
                            </Button>
                            <Button onClick={studioToggle} variant={`${isInStudio ? 'dark' : 'light'}`}>
                                Studio
                            </Button>
                        </section>
                        <div>
                            <Button
                                onClick={() => {
                                    setIsLoading(true);
                                    logoutToggle();
                                }}
                                className="hidden lg:flex justify-center items-center"
                                variant="hot"
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner /> Logging out
                                    </>
                                ) : (
                                    'Logout'
                                )}
                            </Button>
                            <Button
                                onClick={toggle}
                                className={`lg:hidden ${isSmall ? 'hidden' : 'flex'}`}
                                size="round"
                            >
                                <Menu />
                            </Button>
                        </div>
                    </>
                )}

                {!isSmall && !isLoggedIn && (
                    <div className="flex gap-4">
                        <div className="hidden lg:flex">
                            <Link to="/login">
                                <Button onClick={loginSwitchToggle}>Login</Button>
                            </Link>
                            <Link to="/login">
                                <Button onClick={signupSwitchToggle} className="hover:font-semibold" variant={'dark'}>
                                    Sign up
                                </Button>
                            </Link>
                        </div>

                        <Button onClick={toggle} className={`lg:hidden ${isSmall ? 'hidden' : 'flex'}`} size="round">
                            <Menu />
                        </Button>
                    </div>
                )}
            </div>

            {isSmall && (
                <aside
                    className={`grid z-[999] fixed top-0 overscroll-contain overflow-y-scroll overscroll-y-none bg-white min-w-full min-h-full h-screen w-screen shrink-0 | md:transition-all md:w-[28rem] md:min-w-0 md:right-0 md:rounded-l-2xl`}
                >
                    <section className="flex justify-between items-center py-4 px-[50px] top-0 right-0 font-plusJakarta h-[4.5rem] rounded-lg | md:px-[72px] md:justify-end">
                        <div className="flex md:hidden">
                            <Link to="/" reloadDocument>
                                <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                                    BEST
                                </h1>
                            </Link>
                        </div>

                        <Button onClick={close} className="flex" size="round">
                            <X />
                        </Button>
                    </section>
                    <section className="flex flex-col gap-20">
                        <div className="flex gap-4 justify-center | lg:hidden">
                            {!isLoggedIn && (
                                <Button onClick={loginToggle} variant="dark">
                                    Login
                                </Button>
                            )}

                            {isLoggedIn && (
                                <Button
                                    onClick={() => {
                                        setIsLoading(true);
                                        logoutToggle();
                                    }}
                                    className="flex justify-center items-center"
                                    variant="hot"
                                >
                                    {isLoading ? (
                                        <>
                                            <LoadingSpinner /> Logging out
                                        </>
                                    ) : (
                                        'Logout'
                                    )}
                                </Button>
                            )}

                            <Button onClick={() => navigate('/home')} variant="dark">
                                Home
                            </Button>
                        </div>
                        {!isLoggedIn && (
                            <div className="flex flex-col items-center gap-10">
                                <Link to="/login">
                                    <Button
                                        className="bg-secondary-hover w-28"
                                        onClick={() => {
                                            close();
                                            loginSwitchToggle();
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button
                                        className="hover:font-semibold w-28"
                                        onClick={() => {
                                            close();
                                            signupSwitchToggle();
                                        }}
                                        variant={'dark'}
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {isLoggedIn && (
                            <>
                                <div className="flex flex-col items-center gap-10">
                                    <Button
                                        onClick={() => {
                                            setIsLoading(true);
                                            logoutToggle();
                                        }}
                                        className="flex justify-center items-center"
                                        variant="hot"
                                    >
                                        {isLoading ? (
                                            <>
                                                <LoadingSpinner /> Logging out
                                            </>
                                        ) : (
                                            'Logout'
                                        )}
                                    </Button>
                                </div>
                            </>
                        )}
                    </section>
                </aside>
            )}

            {isSmall && <div onClick={close} className="lg:hidden bg-black inset-0 fixed z-[998] opacity-50" />}
        </>
    );
}
