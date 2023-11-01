import img1 from '../assets/images/model-one-iphone.png';
import { Signup } from '../layouts/Signup';
import { SignIn } from '../layouts/SignIn';
import { Button } from '../components/Button';
import { BestGradient } from '../components/BestGradient';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
    // const [isLoginToggle, setIsLoginToggle] = useState(false);
    // const [isSignupToggle, setIsSignupToggle] = useState(true);
    const { isLoginToggle, setIsLoginToggle, isSignupToggle, setIsSignupToggle } = useAuth();

    function loginToggle() {
        setIsLoginToggle(true);
        setIsSignupToggle(false);
    }

    function signupToggle() {
        setIsSignupToggle(true);
        setIsLoginToggle(false);
    }

    return (
        <div className="grid px-4 flex-grow-1 font-plusJakarta mt-24 | md:mt-32 | lg:mt-0 lg:grid-cols-2">
            <div className="hidden lg:flex lg:justify-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px]" src={img1} alt="" />
            </div>
            <div className="flex flex-col items-center | lg:items-start lg:pt-8">
                <h1 className="text-[78px] mb-14 text-center leading-[45px] font-extrabold w-[340px] | md:text-[90px] md:leading-[60px] md:w-[391px] | lg:ms-32 lg:text-[48px] lg:leading-[80px] lg:w-[208px]  lg:mb-9">
                    Join <BestGradient />
                </h1>
                <div className="mb-6">
                    <Button
                        onClick={loginToggle}
                        variant={isLoginToggle ? 'dark' : 'light'}
                        className="w-[227px] rounded-r-none"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={signupToggle}
                        variant={isSignupToggle ? 'dark' : 'light'}
                        className="w-[227px] rounded-l-none"
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
