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
    const navigate = useNavigate();

    const { authEmail, setAuthEmail } = useAuth();
    const { authRes, setAuthRes } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

    const { isCredentials, setIsCredentials } = useAuth();
    const { isNetworkFailure, setIsNetworkFailure } = useAuth();

    const { setIsInHome, setIsInJungle, setIsInStudio, setIsLoggedIn } = useAuth();
    const { isLoginToggle, isSignupToggle } = useAuth();

    const schema = yup.object().shape({
        email: yup.string().email('Enter a real email address').required('Enter your email address'),
        password: yup.string().required('Enter your password'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        try {
            const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/login';

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ...dataForPost } = data;

            const res = await axios.post(apiUrl, dataForPost);

            setAuthRes(res.data.token);
            console.log(res.data.token);

            setAuthEmail(dataForPost.email);
            setIsLoginSuccessful(true);

            setTimeout(() => {
                setIsInHome(true);
                localStorage.setItem('IS_LOGGED_IN', JSON.stringify(true));

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
        if (!isLoginToggle && isSignupToggle) {
            reset();
            setIsCredentials(false);
            setIsNetworkFailure(false);
        }
    }, [isLoginToggle, isSignupToggle, reset, setIsCredentials, setIsNetworkFailure]);

    useEffect(() => {
        window.localStorage.setItem('EMAIL_POST_DATA', JSON.stringify(authEmail));
    }, [authEmail]);

    useEffect(() => {
        window.localStorage.setItem('AUTH_RES_DATA', JSON.stringify(authRes));
    }, [authRes]);

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${isLoginSuccessful ? 'text-green-500' : 'text-red-400'}`}>
                {isNetworkFailure && !isCredentials ? 'Network failure. Try again.' : ''}
                {!isNetworkFailure && isCredentials && !isLoginSuccessful ? 'Username or password incorrect' : ''}
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
                    render={({ field }) => (
                        <Input
                            id={`email-${Math.random().toString(36).substring(7)}`}
                            placeholder="Email address"
                            {...field}
                        />
                    )}
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
                    render={({ field }) => (
                        <Input
                            id={`password-${Math.random().toString(36).substring(7)}`}
                            type="password"
                            placeholder="Password"
                            {...field}
                        />
                    )}
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
