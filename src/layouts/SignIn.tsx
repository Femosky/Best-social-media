import { twMerge } from 'tailwind-merge';
import { Input } from '../components/Input';
import { ComponentProps } from 'react';
import { Button } from '../components/Button';
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';

type formProps = ComponentProps<'form'>;

export function SignIn({ className, ...props }: formProps) {
    const { handleSubmit } = useForm();

    function onSubmit() {
        console.log('FAKE LOGIN');
    }

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Email address
                </label>
                <Input id="email" placeholder="Email address" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Password
                </label>
                <Input id="password" placeholder="Password" />
            </div>

            <Button variant="dark">Login</Button>
        </form>
    );
}
