import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
    const [isSmall, setIsSmall] = useState(false);
    const { setIsLoginToggle, setIsSignupToggle } = useAuth();

    function loginToggle() {
        setIsLoginToggle(true);
        setIsSignupToggle(false);
    }

    function signupToggle() {
        setIsSignupToggle(true);
        setIsLoginToggle(false);
    }

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
    }, []);

    return (
        <>
            <div
                className={`flex w-full justify-between items-center bg-white py-4 px-[50px] sticky top-0 left-0 right-0 font-plusJakarta min-w-[230px] | md:px-[72px]`}
            >
                <div className="">
                    <Link to="/">
                        <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">BEST</h1>
                    </Link>
                </div>

                {!isSmall && (
                    <div className="flex gap-4">
                        <div className="hidden lg:flex">
                            <Link to="/login">
                                <Button onClick={loginToggle}>Login</Button>
                            </Link>
                            <Link to="/login">
                                <Button onClick={signupToggle} className="hover:font-semibold" variant={'dark'}>
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
                    className={`grid z-[999] fixed top-0 bg-white min-w-full min-h-full h-screen w-screen shrink-0 | md:transition-all md:w-[28rem] md:min-w-0 md:right-0 md:rounded-l-2xl`}
                >
                    <section className="flex justify-between items-center py-4 px-[50px] top-0 right-0 font-plusJakarta h-[4.5rem] rounded-lg | md:px-[72px] md:justify-end">
                        <div className="flex md:hidden">
                            <a href="/">
                                <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                                    BEST
                                </h1>
                            </a>
                        </div>

                        <Button onClick={close} className="flex" size="round">
                            <X />
                        </Button>
                    </section>
                    <section>
                        <div className="flex flex-col items-center gap-10">
                            <Link to="/login">
                                <Button
                                    className="bg-secondary-hover w-28"
                                    onClick={() => {
                                        close();
                                        loginToggle();
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
                                        signupToggle();
                                    }}
                                    variant={'dark'}
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </section>
                </aside>
            )}

            {isSmall && <div onClick={close} className="lg:hidden bg-black inset-0 z-999 fixed opacity-50" />}
        </>
    );
};
