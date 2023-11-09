import { twMerge } from 'tailwind-merge';
import { Input } from '../components/Input';
import { ComponentProps, useState } from 'react';
import { Button } from '../components/Button';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingSpinner } from '../components/LoadingSpinner';
import axios from 'axios';

type formProps = ComponentProps<'form'>;

type FormValues = {
    email: string;
    password: string;
};

export function SignIn({ className, ...props }: formProps) {
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email('Enter a real email address').required('Enter your email address'),
        password: yup.string().required('Enter your password'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        try {
            const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/login';

            const res = await axios.post(apiUrl, data);
        } catch 
    }

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Email address
                </label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="email" placeholder="Email address" {...field} />}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Password
                </label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="password" placeholder="Password" {...field} />}
                />
            </div>

            <Button variant="dark" type="submit">
                {!isLoading && !isSignupSuccessful && 'Login'}

                {isLoading && !isSignupSuccessful && (
                    <>
                        <LoadingSpinner /> Checking
                    </>
                )}

                {isLoading && isSignupSuccessful && (
                    <>
                        <LoadingSpinner /> Logging you in
                    </>
                )}
            </Button>
        </form>
    );
}
