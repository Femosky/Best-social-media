import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Menu } from 'lucide-react';

export function TestNavbar() {
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

    return (
        <div
            className={`border border-red-500 flex w-screen justify-between items-center bg-white py-4 px-[50px] sticky top-0 left-0 right-0 font-plusJakarta  | md:px-[72px]`}
        >
            <div className="border border-green-500">
                <Link to="/">
                    <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">BEST</h1>
                </Link>
            </div>

            {!isSmall && (
                <div className="border border-green-500 flex gap-4">
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
    );
}
