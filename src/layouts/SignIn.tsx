import { twMerge } from 'tailwind-merge';
import { Input } from '../components/Input';
import { ComponentProps, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingSpinner } from '../components/LoadingSpinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type formProps = ComponentProps<'form'>;

type FormValues = {
    email: string;
    password: string;
};

export function SignIn({ className, ...props }: formProps) {
    const { authEmail, setAuthEmail } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [isCredentials, setIsCredentials] = useState(false);
    const [isNetworkFailure, setIsNetworkFailure] = useState(false);

    const { setIsInHome, setIsInJungle, setIsInStudio, setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

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

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ...dataForPost } = data;

            const res = await axios.post(apiUrl, dataForPost);

            setAuthEmail(dataForPost.email);
            setIsLoginSuccessful(true);

            setTimeout(() => {
                setIsInHome(true);
                setIsInJungle(false);
                setIsInStudio(false);

                navigate('/home');
                setIsLoggedIn(true);
                localStorage.setItem('IS_LOGGED_IN', JSON.stringify(true));
            }, 3000);

            console.log('Success message: ', res.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false);
            setIsLoginSuccessful(false);
            setIsCredentials(false);
            setIsNetworkFailure(false);
            localStorage.setItem('IS_LOGGED_IN', JSON.stringify(false));

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage === 'Invalid Username or password') {
                    setIsCredentials(true);
                    setIsNetworkFailure(false);
                    console.log('Bingo!');
                    console.log(errorMessage);
                } else {
                    setIsCredentials(false);
                    setIsNetworkFailure(true);
                }
            } else {
                setIsCredentials(false);
                setIsNetworkFailure(true);
            }
        }
    }

    useEffect(() => {
        window.localStorage.setItem('EMAIL_POST_DATA', JSON.stringify(authEmail));
    }, [authEmail]);

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${isLoginSuccessful ? 'text-green-500' : 'text-red-400'}`}>
                {isNetworkFailure && !isCredentials ? 'Network failure. Try again.' : ''}
                {!isNetworkFailure && isCredentials ? 'Username or password incorrect' : ''}
                {isLoginSuccessful && 'Login successful'}
            </div>
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
                <p className="text-red-400">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Password
                </label>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="password" placeholder="Password" {...field} />}
                />
                <p className="text-red-400">{errors.password?.message}</p>
            </div>

            <Button variant="dark" type="submit" className="flex justify-center items-center">
                {!isLoading && !isLoginSuccessful && 'Login'}

                {isLoading && !isLoginSuccessful && (
                    <>
                        <LoadingSpinner /> Checking
                    </>
                )}

                {isLoading && isLoginSuccessful && (
                    <>
                        <LoadingSpinner /> Logging you in
                    </>
                )}
            </Button>
        </form>
    );
}
