import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(['transition-colors'], {
    variants: {
        variant: {
            default: ['hover:bg-secondary-hover', 'hover:text-secondary-dark-hover', 'text-secondary-dark'],
            dark: ['bg-secondary-dark', 'hover:bg-secondary-dark-hover', 'text-white'],
            light: ['bg-secondary-hover', 'hover:bg-secondary-hover-hover'],
            hot: ['bg-secondary-hot', 'text-white', 'hover:bg-secondary-hot-hover'],
        },
        size: {
            default: ['rounded-lg', 'px-5', 'py-2', 'font-medium', 'text-base'],
            round: ['rounded-full', 'items-center', 'justify-center', 'p-2'],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
    return <button {...props} className={twMerge(buttonStyles({ variant, size }), className)} />;
}
