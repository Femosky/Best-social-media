import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const [isSmall, setIsSmall] = useState(false);
    // const [isSmallActive, setIsSmallActive] = useState(false);

    function toggle() {
        setIsSmall((prev) => !prev);
    }

    function close() {
        setIsSmall(false);
    }

    function isScreenSmall() {
        return window.innerWidth < 1024;
    }

    useEffect(() => {
        function handler() {
            if (!isScreenSmall()) setIsSmall(false);
        }

        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);

    return (
        <>
            {!isSmall && (
                <div
                    className={` flex gap-56 justify-between items-center bg-white py-4 px-[50px] md:px-[72px] sticky top-0 font-plusJakarta`}
                >
                    <div>
                        <Link to="/">
                            <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                                BEST
                            </h1>
                        </Link>
                    </div>

                    {!isSmall && (
                        <div className="flex gap-4">
                            <div className="hidden lg:flex">
                                <Link to="/login">
                                    <Button>Login</Button>
                                </Link>
                                <Link to="/login">
                                    <Button className="hover:font-semibold" variant={'dark'}>
                                        Sign up
                                    </Button>
                                </Link>
                            </div>

                            <Button
                                onClick={toggle}
                                className={`lg:hidden ${isSmall ? 'hidden' : 'flex'}`}
                                size="round"
                            >
                                <Menu />
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {isSmall && (
                // <aside
                //     className={`absolute top-0 right-0 grid grid-flow-row items-center border bg-white max-h-screen w-[30rem] over mt-3 mr-[50px] md:mr-[72px]`}
                // >
                //     <div className="flex gap-56 justify-between md:justify-end">
                //         <div>
                //             <Link to="/">
                //                 <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                //                     BEST
                //                 </h1>
                //             </Link>
                //         </div>
                //         <Button onClick={close} className="flex" size="round">
                //             <X />
                //         </Button>
                //     </div>
                //     <div className="flex flex-col items-center">
                //         <Link to="/login" className="border">
                //             <Button>Login</Button>
                //         </Link>
                //         <Link to="/login" className="border">
                //             <Button className="hover:font-semibold" variant={'dark'}>
                //                 Sign up
                //             </Button>
                //         </Link>
                //     </div>
                // </aside>
                <div className="flex justify-end">
                    <aside className="grid z-[999] sticky top-0 border border-red-400 bg-white h-screen | md:w-96 md:absolute md:right-0">
                        <section className="border border-blue-400 md:w-96 flex justify-between items-center bg-white py-4 px-[50px] md:px-[72px] top-0 right-0 font-plusJakarta overflow-hidden h-[4.5rem]">
                            <div>
                                <Link to="/">
                                    <h1 className="text-[20px] font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                                        BEST
                                    </h1>
                                </Link>
                            </div>

                            <Button onClick={close} className="flex" size="round">
                                <X />
                            </Button>
                        </section>
                        <section>
                            <div className="flex flex-col items-center gap-10">
                                <Link to="/login">
                                    <Button className="bg-secondary-hover w-28">Login</Button>
                                </Link>
                                <Link to="/login">
                                    <Button className="hover:font-semibold w-28" variant={'dark'}>
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        </section>
                    </aside>
                </div>
            )}

            {isSmall && <div onClick={close} className="lg:hidden " />}
        </>
    );
};
