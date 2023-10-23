import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(['transition-colors'], {
    variants: {
        variant: {
            default: ['bg-secondary', 'hover:bg-secondary-hover', 'text-secondary-dark'],
            dark: ['bg-secondary-dark', 'hover:bg-secondary-dark-hover', 'text-white'],
        },
        size: {
            default: ['rounded', 'p-2'],
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
