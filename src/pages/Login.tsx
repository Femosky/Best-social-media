import img1 from '../assets/images/model-one-iphone.png';
import { Signup } from '../layouts/Signup';
import { SignIn } from '../layouts/SignIn';
import { Button } from '../components/Button';
import { BestGradient } from '../components/BestGradient';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export function Login() {
    // To check the logged in state
    const { isLoggedIn } = useAuth();

    // To toggle on the Login and Sign up switches
    const { isLoginToggle, setIsLoginToggle } = useAuth();
    const { isSignupToggle, setIsSignupToggle } = useAuth();

    function loginToggle() {
        setIsLoginToggle(true);
        setIsSignupToggle(false);
    }

    function signupToggle() {
        setIsSignupToggle(true);
        setIsLoginToggle(false);
    }

    // to redirect us to our profile (private pages) when logged in
    useEffect(() => {
        if (isLoggedIn) {
            window.location.href = '/home';
        }
    }, [isLoggedIn]);

    return (
        <div className="grid mb-10 font-plusJakarta min-w-[230px] | lg:justify-items-start lg:grid-cols-2">
            <div className="hidden lg:flex lg:justify-self-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px] h-min" src={img1} alt="" />
            </div>
            <div className="flex flex-col w-full max-w-[454px] justify-self-center | md:w-[454px] | lg:justify-self-start">
                <h1 className="text-[38px] sm:text-[56px] mb-14 text-center leading-[45px] font-extrabold | md:leading-[60px] md:w-full | lg:leading-[80px] lg:mb-9">
                    Join <BestGradient content="Best" />
                </h1>
                <div className="mb-6 w-full">
                    <Button
                        onClick={loginToggle}
                        variant={isLoginToggle ? 'dark' : 'light'}
                        className="w-6/12 rounded-r-none"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={signupToggle}
                        variant={isSignupToggle ? 'dark' : 'light'}
                        className="w-6/12 rounded-l-none"
                    >
                        Sign up
                    </Button>
                </div>
                <div className="flex w-full">
                    <SignIn className={isLoginToggle ? 'flex' : 'hidden'} />
                    <Signup className={isSignupToggle ? 'flex' : 'hidden'} />
                </div>
            </div>
        </div>
    );
}
