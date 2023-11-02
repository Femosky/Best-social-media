import { ComponentProps } from 'react';
import { Input } from '../components/Input';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type formProps = ComponentProps<'form'>;

export function Signup({ className, ...props }: formProps) {
    const { register, handleSubmit } = useForm();

    function onSubmit() {
        console.log('FAKE SUBMIT');
    }

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label htmlFor="firstname" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    First name
                </label>
                <Input id="firstname" placeholder="First name" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="surname" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Surname
                </label>
                <Input id="surname" placeholder="Surname" />
            </div>

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

            <div className="flex flex-col">
                <label htmlFor="confirm-password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Confirm password
                </label>
                <Input id="confirm-password" placeholder="Confirm password" />
            </div>

            <Button variant="dark" type="submit">
                Sign up
            </Button>
        </form>
    );
}
