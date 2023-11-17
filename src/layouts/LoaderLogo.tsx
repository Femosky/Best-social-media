import { ComponentProps, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';

type LoaderLogoProps = ComponentProps<'div'>;

export function LoaderLogo({ className, ...props }: LoaderLogoProps) {
    const { isRefreshing, setIsRefreshing } = useAuth();

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isRefreshing);

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isRefreshing]);

    useEffect(() => {
        function handleBeforeUnload() {
            localStorage.setItem('isRefreshing', 'true');
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            localStorage.removeItem('isRefreshing');
        };
    }, []);

    useEffect(() => {
        const storedIsRefreshing = localStorage.getItem('isRefreshing');
        const isRefreshed = storedIsRefreshing === 'true';

        if (isRefreshed) {
            console.log('Page is being refreshed');
            setIsRefreshing(true);

            setTimeout(() => {
                setIsRefreshing(false);
            }, 600);
        }
    }, [setIsRefreshing]);

    return (
        <>
            {isRefreshing && (
                <div
                    {...props}
                    className={twMerge(
                        'flex fixed z-[1000] bg-white justify-center items-center h-full w-full',
                        className
                    )}
                >
                    <h1 className="text-[20px] font-plusJakarta font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                        BEST
                    </h1>
                    {/* <p>lg:hidden bg-black inset-0 fixed z-[998] opacity-50</p> */}
                </div>
            )}
        </>
    );
}
