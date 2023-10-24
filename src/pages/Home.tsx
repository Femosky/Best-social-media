import { Button } from '../components/Button';
import img1 from '../assets/images/model-one-iphone.png';

export function Home() {
    return (
        <div className="grid px-4 lg:grid-cols-2 flex-grow-1 font-plusJakarta">
            <div className="lg:order-1 order-2 flex lg:justify-end lg:pe-28 justify-center mt-[60px] lg:mt-0">
                <img className="w-[500px]" src={img1} alt="" />
            </div>
            <div className="lg:order-2 order-1 flex flex-col lg:pt-32 items-center lg:items-start">
                <h1 className="lg:text-[64px] text-[40px] md:text-[48px] text-center lg:text-start leading-[45px] md:leading-[60px] lg:leading-[80px] font-extrabold w-[390px] md:w-[371px] lg:w-[492px]">
                    Share your{' '}
                    <span className="bg-gradient-to-r from-[#FF00B8] from-50% via-[#004BDD] to-[#8F00FF] text-transparent bg-clip-text">
                        Best
                    </span>{' '}
                    pics with your{' '}
                    <span className="bg-gradient-to-r from-[#FF00B8] from-70% via-[#004BDD] to-[#8F00FF] text-transparent bg-clip-text">
                        Best
                    </span>{' '}
                    friends.
                </h1>
                <h4 className="font-inter text-gray-500 text-base lg:text-lg mt-4 mb-4 md:mb-11 lg:mt-6 lg:mb-20">
                    Showcase your art instantly with your Besties!
                </h4>
                <Button variant="dark" className="lg:w-[465px] font-bold">
                    Sign up
                </Button>
            </div>
        </div>
    );
}

// #FF00B8
// #004BDD
// #8F00FF
