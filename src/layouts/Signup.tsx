import { ComponentProps } from 'react';
import { Input } from '../components/Input';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

type formProps = ComponentProps<'form'>;

type FormValues = {
    firstname: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export function Signup({ className, ...props }: formProps) {
    const schema = yup.object().shape({
        firstname: yup.string().required('Enter your first name'),
        surname: yup.string().required('Enter your surname'),
        email: yup.string().email('Enter a real email address').required('Enter your email address'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 Characters')
            .max(20, 'Password too long')
            .required('Enter a password')
            .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
            .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),

        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password not matching')
            .required('Confirm your password'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    function onSubmit(data: FormValues) {
        console.log(data);
    }

    function code(data: FormValues) {
        Axios.post();
    }

    return (
        <form {...props} className={twMerge('flex flex-col gap-6 w-full', className)} onSubmit={handleSubmit(onSubmit)}>
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
                    name="surname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="surname" placeholder="Surname" {...field} />}
                />
                <p className="text-red-400">{errors.surname?.message}</p>
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

            <div className="flex flex-col">
                <label htmlFor="confirm-password" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                    Confirm password
                </label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Input id="confirm-password" placeholder="Confirm password" {...field} />}
                />
                <p className="text-red-400">{errors.confirmPassword?.message}</p>
            </div>

            <Button variant="dark" type="submit">
                Sign up
            </Button>
        </form>
    );
}
