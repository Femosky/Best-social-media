// import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'>;

export function Input({ className, id, placeholder, ...props }: InputProps) {
    return (
        <input
            {...props}
            type="text"
            id={id}
            placeholder={placeholder}
            className={twMerge(
                'border border-[#EBEBF0] rounded-2xl bg-[#F5F5FA] p-6 text-[#1D1E24] font-inter text-base w-[454px] h-[67px] focus:outline-none',
                className
            )}
        />
    );
}
