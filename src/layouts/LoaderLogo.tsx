import { ComponentProps, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';
// import { BestGradient } from '../components/BestGradient';

type LoaderLogoProps = ComponentProps<'div'>;

export function LoaderLogo({ className, ...props }: LoaderLogoProps) {
    const { isRefreshing, setIsRefreshing } = useAuth();

    useEffect(() => {
        // to stop scrolling when the loader logo is shown
        document.body.classList.toggle('overflow-hidden', isRefreshing);

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isRefreshing]);

    useEffect(() => {
        // to check when the page is refreshed
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
        // to add a timer to the loader logo when the page is refreshed
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
                    <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-extrabold tracking-[3px] text-gray-900">
                        BEST
                    </h1>
                    {/* <BestGradient
                        content="BEST"
                        className="text-[20px] md:text-[30px] lg:text-[40px] font-plusJakarta font-extrabold tracking-[3px]"
                    /> */}
                </div>
            )}
        </>
    );
}
