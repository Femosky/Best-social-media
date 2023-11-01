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
        <div className="border border-green-500 grid px-4 mb-10 flex-grow-1 font-plusJakarta w-screen | lg:justify-items-start lg:grid-cols-2 h-auto">
            <div className="border border-yellow-700 hidden lg:flex lg:justify-self-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px] h-min" src={img1} alt="" />
            </div>
            <div className="border border-yellow-700 flex flex-col w-full max-w-[454px] justify-self-center mt-10 | md:w-[454px] md:mt-20 | lg:pt-8 lg:justify-self-start">
                <h1 className="border border-yellow-700 text-[56px] mb-14 text-center leading-[45px] font-extrabold min-w-[338px] | md:leading-[60px] md:w-full | lg:leading-[80px] lg:mb-9">
                    Join <BestGradient />
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
