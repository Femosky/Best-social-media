import { useEffect, useState } from 'react';
import defaultImg from '../assets/images/profile-pic.png';
import { BestGradient } from '../components/BestGradient';
import { Button } from '../components/Button';
import { PostsProfile } from '../components/profile/PostsProfile';
import { SnapsProfile } from '../components/profile/SnapsProfile';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

type FormValues = {
    email: string;
};

type UserDataProps = {
    numberOfAdores: number | null;
    numberOfBesties: number | null;
    numberOfPosts: number | null;
    profileDescription: string | null;
    username: string | null;
};

export function Studio() {
    const { isLoggedIn, setIsInHome, setIsInJungle, setIsInStudio } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            window.location.href = '/';
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setIsInHome(false);
        setIsInJungle(false);
        setIsInStudio(true);
    }, [setIsInHome, setIsInJungle, setIsInStudio]);

    const [isPostsToggle, setIsPostsToggle] = useState(true);
    const [isSnapsToggle, setisSnapsToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfileData, setUserProfileData] = useState<UserDataProps>({
        numberOfAdores: 0,
        numberOfBesties: 0,
        numberOfPosts: 0,
        profileDescription: '',
        username: '',
    });

    const { authEmail, setAuthEmail } = useAuth();
    const { authRes, setAuthRes } = useAuth();

    // const { data: FormValues } = useQuery(['username'], async () => {

    // });

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/profile';

                const config = {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authRes}`,
                    },
                };
                console.log('config', config);
                console.log('authEmail', authEmail);
                console.log('authRes', authRes);

                const dataForPost: FormValues = {
                    email: authEmail,
                };

                console.log(dataForPost);

                const res = await axios.post(apiUrl, dataForPost, config);

                setIsLoading(false);
                console.log(userProfileData);

                const newUserData: UserDataProps = {
                    numberOfAdores: res.data.number_of_adores,
                    numberOfBesties: res.data.number_of_besties,
                    numberOfPosts: res.data.number_of_posts,
                    profileDescription: res.data.profile_description,
                    username: res.data.username,
                };

                if (newUserData.numberOfAdores === null) {
                    newUserData.numberOfAdores = 0;
                }

                if (newUserData.numberOfBesties === null) {
                    newUserData.numberOfBesties = 0;
                }

                if (newUserData.numberOfPosts === null) {
                    newUserData.numberOfPosts = 0;
                }

                if (newUserData.profileDescription === null) {
                    newUserData.profileDescription =
                        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero molestias exercitationem inventore illo, tenetur ut cumque itaque.';
                }

                setUserProfileData(newUserData);

                console.log('Successful: ', res.data);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setIsLoading(false);

                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;

                    if (errorMessage === 'User not authenticated') {
                        setIsLoading(true);
                        console.log('user indeed not authenticated');
                        console.log('error: ', errorMessage);
                        console.log('error: ', error.response);
                    } else if (error.response.data.msg === 'Missing Authorization Header') {
                        console.log('error:', error.response.data.msg);
                        console.log('Missing Authorization Header INDEED');
                    } else if (errorMessage === 'User not found') {
                        console.log('user indeed not found');
                        console.log('error: ', errorMessage);
                    } else {
                        console.log('error: ', error.response);
                    }
                } else {
                    console.log('error: ', error.response);
                }

                // window.location.href = '*';
            }
        }

        fetchData();
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

    // useEffect(() => {
    //     try {

    //     }
    // }. [])

    useEffect(() => {
        const data = window.localStorage.getItem('EMAIL_POST_DATA');
        // console.log('data:', data);
        if (data !== null) setAuthEmail(JSON.parse(data));
    }, [setAuthEmail]);

    useEffect(() => {
        const data = window.localStorage.getItem('AUTH_RES_DATA');
        console.log('data:', data);
        if (data !== null) setAuthRes(JSON.parse(data));
    }, [setAuthRes]);

    return (
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
                        <div className="flex justify-center w-full | md:justify-start">
                            <h1 className="w-fit text-center text-[20px] font-bold | xs:text-[30px] | md:text-left md:text-[40px]">
                                {isLoading ? <LoadingSpinner /> : userProfileData?.username}
                                {!userProfileData && 'Username'}
                            </h1>
                        </div>
                        <div className="flex font-bold w-full gap-4 text-center justify-center text-[5vw] | xxs:text-lg | xs:text-xl | md:text-left md:justify-normal md:gap-12 | lg:text-2xl lg:gap-[6.25rem]">
                            <div className="flex items-center gap-3 | md:gap-6">
                                <h2>{isLoading ? <LoadingSpinner /> : userProfileData?.numberOfPosts}</h2>
                                <h2>Posts</h2>
                            </div>
                            <div className="flex items-center gap-3 | md:gap-6">
                                <h2>{isLoading ? <LoadingSpinner /> : userProfileData?.numberOfAdores}</h2>
                                <h2>Adores</h2>
                            </div>
                            <div className="flex items-center gap-3 | md:gap-6">
                                {isLoading ? <LoadingSpinner /> : <h2>{userProfileData?.numberOfBesties}</h2>}
                                <h2>
                                    <BestGradient content="Besties" />
                                </h2>
                            </div>
                        </div>
                        <p className="font-inter text-center | md:text-start">
                            {isLoading ? <LoadingSpinner /> : userProfileData?.profileDescription}
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
    );
}
