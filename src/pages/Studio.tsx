// This is the Profile Page

import { useEffect, useState } from 'react';
import defaultImg from '../assets/images/profile-pic.png';
import { BestGradient } from '../components/BestGradient';
import { Button } from '../components/Button';
import { PostsProfile } from '../components/profile/PostsProfile';
import { SnapsProfile } from '../components/profile/SnapsProfile';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EditProfile } from '../layouts/EditProfile';

export function Studio() {
    const { setIsInHome, setIsInJungle, setIsInStudio } = useAuth();
    const { isEditProfileOpen, setIsEditProfileOpen } = useAuth();

    const { authEmail, setAuthEmail } = useAuth();
    const { authRes } = useAuth();

    const { setUsername } = useAuth();
    const { setBio } = useAuth();

    function toggleEditProfile() {
        setIsEditProfileOpen((prev) => !prev);
    }

    useEffect(() => {
        if (isEditProfileOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isEditProfileOpen]);

    useEffect(() => {
        setIsInHome(false);
        setIsInJungle(false);
        setIsInStudio(true);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    const [isPostsToggle, setIsPostsToggle] = useState(true);
    const [isSnapsToggle, setisSnapsToggle] = useState(false);
    const { isProfileLoading } = useAuth();
    const { userProfileData } = useAuth();
    const { fetchData } = useAuth();
    // const [userProfileData, setUserProfileData] = useState<UserDataProps>({
    //     numberOfAdores: 0,
    //     numberOfBesties: 0,
    //     numberOfPosts: 0,
    //     profileDescription: '',
    //     username: '',
    // });

    // const { data: FormValues } = useQuery(['username'], async () => {

    // });

    useEffect(() => {
        if (!userProfileData) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authEmail, authRes]);
    // }, [authEmail, authRes, userProfileData]);

    function postsToggle() {
        setIsPostsToggle(true);
        setisSnapsToggle(false);
    }

    function snapsToggle() {
        setIsPostsToggle(false);
        setisSnapsToggle(true);
    }

    useEffect(() => {
        const data = window.localStorage.getItem('EMAIL_POST_DATA');
        // console.log('data:', data);
        if (data !== null) setAuthEmail(JSON.parse(data));
    }, [setAuthEmail]);

    useEffect(() => {
        const username = userProfileData?.username ?? '';
        const bio = userProfileData?.profileDescription ?? '';

        setUsername(username);
        setBio(bio);
    }, [isEditProfileOpen, userProfileData, setUsername, setBio]);

    // useEffect(() => {
    //     const data = window.localStorage.getItem('AUTH_RES_DATA');
    //     console.log('data:', data);
    //     if (data !== null) setAuthRes(JSON.parse(data));
    // }, [setAuthRes]);

    return (
        <>
            {isEditProfileOpen && (
                <>
                    <div
                        onClick={toggleEditProfile}
                        className="absolute h-screen inset-0 bg-black opacity-50 z-[9]"
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <EditProfile className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10] w-full max-w-[60rem]" />
                    </div>
                </>
            )}

            <div className="flex justify-center text-secondary-normal">
                <div className="flex flex-col w-full min-w-[230px] gap-[2.5rem] | sm:gap-[4rem] | lg:gap-[8.5rem] md:w-[47rem] | lg:w-[69rem]">
                    <section className="flex w-full gap-4 flex-col |  | md:flex-row | lg:gap-[6.25rem]">
                        <div className="w-fit self-center md:self-start">
                            <img
                                className="w-28 max-w-[228px] | md:h-auto md:w-[170px] | lg:w-[228px]"
                                src={defaultImg}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col w-full gap-6 justify-center">
                            <div className="flex w-full items-center justify-between">
                                <h1 className="w-fit text-[20px] font-bold | xs:text-[30px] | md:text-left md:text-[40px]">
                                    {isProfileLoading && !userProfileData ? (
                                        <LoadingSpinner />
                                    ) : (
                                        userProfileData?.username
                                    )}
                                    {!userProfileData && !isProfileLoading && 'Username'}
                                </h1>
                                <div>
                                    <Button
                                        onClick={toggleEditProfile}
                                        variant="dark"
                                        className=" text-[0.5rem] px-2 | xs:text-xs xs:px-5"
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>
                            <div className="flex font-bold w-full gap-4 text-center justify-center text-[5vw] | xxs:text-lg | xs:text-xl | md:text-left md:justify-normal md:gap-12 | lg:text-2xl lg:gap-[6.25rem]">
                                <div className="flex items-center gap-3 | md:gap-6">
                                    <h2>
                                        {isProfileLoading && !userProfileData ? (
                                            <LoadingSpinner />
                                        ) : (
                                            userProfileData?.numberOfPosts
                                        )}
                                    </h2>
                                    <h2>Posts</h2>
                                </div>
                                <div className="flex items-center gap-3 | md:gap-6">
                                    <h2>
                                        {isProfileLoading && !userProfileData ? (
                                            <LoadingSpinner />
                                        ) : (
                                            userProfileData?.numberOfAdores
                                        )}
                                    </h2>
                                    <h2>Adores</h2>
                                </div>
                                <div className="flex items-center gap-3 | md:gap-6">
                                    {isProfileLoading && !userProfileData ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <h2>{userProfileData?.numberOfBesties}</h2>
                                    )}
                                    <h2>
                                        <BestGradient content="Besties" />
                                    </h2>
                                </div>
                            </div>
                            <p className="font-inter text-center | md:text-start">
                                {isProfileLoading && !userProfileData ? (
                                    <LoadingSpinner />
                                ) : (
                                    userProfileData?.profileDescription
                                )}
                            </p>
                        </div>
                    </section>

                    <section className="flex flex-col">
                        <div className="mb-6 w-full">
                            <Button
                                onClick={postsToggle}
                                variant={isPostsToggle ? 'dark' : 'light'}
                                className="w-6/12 rounded-r-none"
                            >
                                Posts
                            </Button>
                            <Button
                                onClick={snapsToggle}
                                variant={isSnapsToggle ? 'dark' : 'light'}
                                className="w-6/12 rounded-l-none"
                            >
                                Snaps
                            </Button>
                        </div>
                        <div className="border w-full flex-grow">
                            {isPostsToggle && <PostsProfile />}
                            {isSnapsToggle && <SnapsProfile />}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
