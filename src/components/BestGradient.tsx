import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type SpanProps = ComponentProps<'span'>;

export function BestGradient({ content, className, ...props }: SpanProps) {
    return (
        <span
            {...props}
            className={twMerge(
                'bg-gradient-to-r from-[#FF00B8] from-50% via-[#004BDD] to-[#8F00FF] text-transparent bg-clip-text',
                className
            )}
        >
            {content}
        </span>
    );
}
