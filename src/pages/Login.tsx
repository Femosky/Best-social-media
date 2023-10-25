import { Link } from 'react-router-dom';
import img1 from '../assets/images/model-one-iphone.png';
// import { Input } from '../components/Input';
import { Signup } from '../layouts/Signup';
import { SignIn } from '../layouts/SignIn';
import { useState } from 'react';
import { Button } from '../components/Button';
import { BestGradient } from '../components/BestGradient';

export function Login() {
    const [isLoginToggle, setIsLoginToggle] = useState(true);
    const [isSignupToggle, setIsSignupToggle] = useState(false);

    function loginToggle() {
        setIsLoginToggle(true);
        setIsSignupToggle(false);
    }

    function signupToggle() {
        setIsSignupToggle(true);
        setIsLoginToggle(false);
    }

    return (
        <div className="grid px-4 lg:grid-cols-2 flex-grow-1 font-plusJakarta">
            <div className="hidden lg:flex lg:justify-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px]" src={img1} alt="" />
            </div>
            <div className="flex flex-col lg:pt-8">
                <h1 className="text-[78px] lg:ms-32 md:text-[90px] lg:text-[48px] text-center leading-[45px] md:leading-[60px] lg:leading-[80px] font-extrabold w-[340px] md:w-[391px] lg:w-[208px] mb-14 lg:mb-9">
                    Join <BestGradient />
                </h1>
                <div className="mb-6">
                    <Button
                        onClick={loginToggle}
                        variant={isLoginToggle ? 'dark' : 'default'}
                        className="w-[227px] rounded-r-lg"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={signupToggle}
                        variant={isSignupToggle ? 'dark' : 'default'}
                        className="w-[227px] rounded-l-lg"
                    >
                        Sign up
                    </Button>
                </div>
                <div className="flex">
                    <SignIn className={isLoginToggle ? 'flex' : 'hidden'} />
                    <Signup className={isSignupToggle ? 'flex' : 'hidden'} />
                </div>
            </div>
        </div>
    );
}
