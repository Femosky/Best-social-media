// import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'>;

export function Input({ type, className, id, placeholder, ...props }: InputProps) {
    return (
        <input
            {...props}
            type={type}
            id={id}
            placeholder={placeholder}
            className={twMerge(
                'border border-[#EBEBF0] rounded-2xl bg-[#F5F5FA] px-6 py-4 text-[#1D1E24] font-inter text-base w-full focus:outline-none',
                className
            )}
        />
    );
}
