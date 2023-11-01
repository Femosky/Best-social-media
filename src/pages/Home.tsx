import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import img1 from '../assets/images/model-one-iphone.png';
import { BestGradient } from '../components/BestGradient';

export function Home() {
    return (
        <div className="grid px-4 lg:grid-cols-2 flex-grow-1 font-plusJakarta">
            <div className="lg:order-1 order-2 flex lg:justify-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px] max-sm:w-[250px]" src={img1} alt="" />
            </div>
            <div className="lg:order-2 order-1 flex flex-col lg:pt-32 items-center lg:items-start">
                <h1 className=" text-[40px] text-center leading-[45px] font-extrabold min- w-[370px] | md:text-[48px] md:leading-[60px] md:w-[371px] | lg:w-[492px] lg:text-[64px] lg:text-start lg:leading-[80px]">
                    Share your <BestGradient /> pics with your <BestGradient /> friends.
                </h1>
                <h4 className="font-inter text-gray-500 text-base lg:text-lg mt-4 mb-4 md:mb-11 lg:mt-6 lg:mb-20">
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

// #FF00B8
// #004BDD
// #8F00FF
