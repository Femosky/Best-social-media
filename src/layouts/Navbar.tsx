import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <div className="flex justify-between items-center bg-white py-4 px-[50px] md:px-[72px] sticky top-0 font-plusJakarta">
            <div>
                <Link to="/">
                    {/* <img className="w-[80px] h-6.5" src="src\assets\logo-best.png" alt="" /> */}
                    <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">BEST</h1>
                </Link>
            </div>
            {/* <div>
                <Link to="/">Home</Link>
            </div> */}
            <div className="flex gap-4">
                <div className="hidden md:flex">
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                    <Link to="/login">
                        <Button className="hover:font-semibold" variant={'dark'}>
                            Sign up
                        </Button>
                    </Link>
                </div>
                <Button className="flex md:hidden" size="round">
                    <Menu />
                </Button>
            </div>
        </div>
    );
};
