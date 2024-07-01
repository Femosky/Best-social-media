import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Textarea } from '../components/Textarea';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

type FormValues = {
    username: string;
    bio: string;
};

type EditProfileProps = ComponentProps<'form'>;

export function EditProfile({ className, ...props }: EditProfileProps) {
    // const navigate = useNavigate();

    const { authRes } = useAuth();
    const { setIsEditProfileOpen } = useAuth();
    // const { setIsInStudio } = useAuth();

    const { username } = useAuth();
    const { bio } = useAuth();

    const { setIsLoggedIn } = useAuth();

    const { fetchData } = useAuth();

    function toggleEditProfile() {
        setIsEditProfileOpen((prev) => !prev);
    }

    const schema = yup.object().shape({
        username: yup.string().required('Enter a your username'),
        bio: yup.string().max(150, "You've reached your max of 150 characters").required('Enter your bio'),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        // reset,
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    async function onSubmit(data: FormValues) {
        try {
            const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/editprofile';

            const config = {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authRes}`,
                },
            };

            const { ...dataForPost } = data;

            await axios.post(apiUrl, dataForPost, config);
            // console.log('PROFILE UPDATED', res);

            setIsEditProfileOpen(false);
            fetchData();
            // window.location.href = '/studio';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage === 'Token has expired') {
                    setIsLoggedIn(false);
                    localStorage.setItem('IS_LOGGED_IN', JSON.stringify(false));

                    // console.log('Token expired');
                    // console.log('error: ', errorMessage);
                    // console.log('error: ', error.response);
                } else if (error.response.data.msg === 'Missing Authorization Header') {
                    // console.log('error:', error.response.data.msg);
                    // console.log('Missing Authorization Header INDEED');
                } else {
                    // console.log('error: SECOND', error.response);
                }
            } else {
                // console.log('error FINAL: ', error.response);
            }
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...props}
            className={twMerge('bg-white p-[3.5rem] rounded-lg', className)}
        >
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between">
                    <h2 className=" font-bold text-2xl">Edit Profile</h2>
                    <Button onClick={toggleEditProfile} variant="dark" size="round">
                        <X />
                    </Button>
                </div>
                {/* Username */}
                <div className="flex flex-col w-full">
                    <label htmlFor="username" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                        Change your Username
                    </label>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue={username}
                        render={({ field }) => (
                            <Input
                                id={`username-${Math.random().toString(36).substring(7)}`}
                                type="text"
                                placeholder="Username"
                                defaultValue={username}
                                className="w-full"
                                {...field}
                            />
                        )}
                    />
                    <p className="text-red-400">{errors.username?.message}</p>
                </div>

                {/* Bio */}
                <div className="flex flex-col w-full">
                    <p className="text-red-400"></p>
                    <label htmlFor="bio" className="mb-[16px] font-inter font-bold text-sm text-[#1D1E24]">
                        Edit your Bio
                    </label>
                    <Controller
                        name="bio"
                        control={control}
                        defaultValue={bio}
                        render={({ field }) => (
                            <Textarea
                                id={`bio-${Math.random().toString(36).substring(7)}`}
                                placeholder="Bio"
                                className="w-full h-[10rem]"
                                {...field}
                            />
                        )}
                    />
                    <p className="text-red-400">{errors.bio?.message}</p>
                </div>

                <Button className="bg-green-800" variant="dark">
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
