import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type LoaderLogoProps = ComponentProps<'div'>;

export function LoaderLogo({ className, ...props }: LoaderLogoProps) {
    return (
        <div
            {...props}
            className={twMerge('border border-red-500 flex justify-center items-center w-screen h-screen', className)}
        >
            <h1 className="text-[20px] font-plusJakarta font-extrabold leading-[30px] tracking-[3px] text-gray-900">
                BEST
            </h1>
        </div>
    );
}
