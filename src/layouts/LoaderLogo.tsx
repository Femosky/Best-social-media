import { ComponentProps, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';

type LoaderLogoProps = ComponentProps<'div'>;

export function LoaderLogo({ className, ...props }: LoaderLogoProps) {
    const { isRefreshing } = useAuth();

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isRefreshing);

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isRefreshing]);

    return (
        <div {...props} className={twMerge('flex fixed justify-center items-center h-screen w-screen', className)}>
            <h1 className="text-[20px] font-plusJakarta font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                BEST
            </h1>
            {/* <p>lg:hidden bg-black inset-0 fixed z-[998] opacity-50</p> */}
        </div>
    );
}
