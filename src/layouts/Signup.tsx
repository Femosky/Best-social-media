import { ComponentProps, useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

type formProps = ComponentProps<'form'>;

type FormValues = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export function Signup({ className, ...props }: formProps) {
    const navigate = useNavigate();

    // To store the user's email for authentication in profile
    const { authEmail, setAuthEmail } = useAuth();

    // To toggle on the Login and Sign up switches
    const { setIsLoginToggle, setIsSignupToggle } = useAuth();

    // To clear fields for Login
    const { setIsCredentials, setIsNetworkFailure } = useAuth();
    const { isLoginToggle, isSignupToggle } = useAuth();

    // For error and success prompts
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
    const [isAccountExisting, setIsAccountExisting] = useState(false);
    const [visible, setErrorVisible] = useState(false);

    // For loading
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        firstname: yup.string().required('Enter your first name'),
        lastname: yup.string().required('Enter your surname'),
        username: yup.string().required('Enter a username'),
        email: yup.string().email('Enter a real email address').required('Enter your email address'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 Characters')
            .max(20, 'Password too long')
            .required('Enter a password')
            .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
            .matches(/^(?=.*[!@#$%^&*-_=+`~;:'"<>,./?])/, 'Password must contain at least one special character'),

        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), undefined], 'Password not matching')
            .required('Confirm your password'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        try {
            const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/register';

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...dataForPost } = data;

            const res = await axios.post(apiUrl, dataForPost);

            // console.log('Signup successful: ', res.data);

            if (res.data.message === 'Account Successfully created') {
                setAuthEmail(dataForPost.email);
                setIsAccountExisting(false);
                setIsSignupSuccessful(true);

                setTimeout(() => {
                    setIsLoginToggle(true);
                    setIsSignupToggle(false);

                    setIsCredentials(false);
                    setIsNetworkFailure(false);

                    reset();

                    navigate('/login');
                }, 3000);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false);
            setIsSignupSuccessful(false);
            setIsAccountExisting(false);
            setErrorVisible(false);

            // console.log('Error signing up: ', error);

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage === 'User already exists!') {
                    // console.log('User already exists!');
                    setIsAccountExisting(true);
                    setErrorVisible(false);
                } else {
                    setIsAccountExisting(false);
                    setErrorVisible(true);
                }
            } else {
                setIsAccountExisting(false);
                setErrorVisible(true);
            }
        }
    }

    useEffect(() => {
        // to clear input fields & errors when switching btw login and signup
        if (isLoginToggle && !isSignupToggle) {
            reset();
            setIsCredentials(false);
            setIsNetworkFailure(false);
        }
    }, [isLoginToggle, isSignupToggle, reset, setIsCredentials, setIsNetworkFailure]);

    // storage
    useEffect(() => {
        window.localStorage.setItem('EMAIL_POST_DATA', JSON.stringify(authEmail));
    }, [authEmail]);

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${isSignupSuccessful ? 'text-green-500' : 'text-red-400'}`}>
                {isAccountExisting && !visible ? 'This email address belongs to an account' : ''}
                {!isSignupSuccessful && visible ? 'Network failure. Try again.' : ''}
                {isSignupSuccessful && 'Account created successfully'}
            </div>
            <div className="flex flex-col">
                <label htmlFor="firstname" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    First name
                </label>
                <Controller
                    name="firstname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="firstname" placeholder="First name" {...field} />}
                />
                <p className="text-red-400">{errors.firstname?.message}</p>
            </div>

            <div className="flex flex-col">
                <label htmlFor="surname" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Surname
                </label>
                <Controller
                    name="lastname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="lastname" placeholder="Surname" {...field} />}
                />
                <p className="text-red-400">{errors.lastname?.message}</p>
            </div>

            <div className="flex flex-col">
                <label htmlFor="username" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Username
                </label>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="username" placeholder="Username" {...field} />}
                />
                <p className="text-red-400">{errors.username?.message}</p>
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

            <div className="flex flex-col">
                <label htmlFor="confirm-password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Confirm password
                </label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input id="confirm-password" type="password" placeholder="Confirm password" {...field} />
                    )}
                />
                <p className="text-red-400">{errors.confirmPassword?.message}</p>
            </div>

            <Button variant="dark" type="submit" className="flex justify-center items-center">
                {!isLoading && !isSignupSuccessful && 'Sign up'}

                {isLoading && !isSignupSuccessful && (
                    <>
                        <LoadingSpinner /> Signing up
                    </>
                )}

                {isLoading && isSignupSuccessful && (
                    <>
                        <LoadingSpinner /> Redirecting you to Login
                    </>
                )}
            </Button>
        </form>
    );
}
