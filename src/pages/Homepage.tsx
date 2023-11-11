import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import modelOneIphoneImg from '../assets/images/model-one-iphone.png';
import { BestGradient } from '../components/BestGradient';
// import { useAuth } from '../contexts/AuthContext';

export function Homepage() {
    // const { isLoggedIn } = useAuth();

    // console.log(isLoggedIn);

    return (
        <div className={`grid lg:grid-cols-2 flex-grow-1 font-plusJakarta min-w-[230px]`}>
            <div className="order-2 flex justify-center mt-[30px] | md:mt-[60px] | lg:order-1 lg:justify-end lg:pe-28 lg:mt-0">
                <img className="w-[350px] | xs:w-[500px]" src={modelOneIphoneImg} alt="" />
            </div>
            <div className="lg:order-2 order-1 flex flex-col lg:pt-32 items-center lg:items-start">
                <h1 className="text-[28px] text-center leading-[30px] font-extrabold w-[215px] | xs:text-[40px] xs:w-[307px] xs:leading-[45px] | md:text-[48px] md:leading-[60px] md:w-[370px] | lg:w-[492px] lg:text-[64px] lg:text-start lg:leading-[80px]">
                    Share your <BestGradient content="Best" /> pics with your <BestGradient content="Best" /> friends.
                </h1>
                <h4 className="font-inter text-[9px] text-gray-500 mt-4 mb-4 | xs:text-base | md:mb-11 | lg:mt-6 lg:mb-20 lg:text-lg">
                    Showcase your art instantly with your Besties!
                </h4>
                <Link to="/login">
                    <Button variant="dark" className="lg:w-[465px] font-bold">
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
