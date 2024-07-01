import { createContext, useContext, useState } from 'react';
import { ChildrenProps } from '../App';
import axios from 'axios';

const AuthContext = createContext<
    | {
          isLoginToggle: boolean;
          setIsLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
          isSignupToggle: boolean;
          setIsSignupToggle: React.Dispatch<React.SetStateAction<boolean>>;
          isLoggedIn: boolean;
          setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
          isInHome: boolean;
          setIsInHome: React.Dispatch<React.SetStateAction<boolean>>;
          isInJungle: boolean;
          setIsInJungle: React.Dispatch<React.SetStateAction<boolean>>;
          isInStudio: boolean;
          setIsInStudio: React.Dispatch<React.SetStateAction<boolean>>;
          authEmail: string;
          setAuthEmail: React.Dispatch<React.SetStateAction<string>>;
          authRes: string;
          setAuthRes: React.Dispatch<React.SetStateAction<string>>;
          isCredentials: boolean;
          setIsCredentials: React.Dispatch<React.SetStateAction<boolean>>;
          isNetworkFailure: boolean;
          setIsNetworkFailure: React.Dispatch<React.SetStateAction<boolean>>;
          user: boolean | null;
          setUser: React.Dispatch<React.SetStateAction<boolean | null>>;
          isRefreshing: boolean;
          setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
          isEditProfileOpen: boolean;
          setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
          username: string;
          setUsername: React.Dispatch<React.SetStateAction<string>>;
          bio: string;
          setBio: React.Dispatch<React.SetStateAction<string>>;
          isProfileLoading: boolean;
          setIsProfileLoading: React.Dispatch<React.SetStateAction<boolean>>;
          userProfileData: UserDataProps | null;
          fetchData: () => Promise<void>;
      }
    | undefined
>(undefined);

type UserDataProps = {
    numberOfAdores: number | null;
    numberOfBesties: number | null;
    numberOfPosts: number | null;
    profileDescription: string | null;
    username: string | null;
};

type FormValues = {
    email: string;
};

export function AuthProvider({ children }: ChildrenProps) {
    const [isLoginToggle, setIsLoginToggle] = useState(true);
    const [isSignupToggle, setIsSignupToggle] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedValue = localStorage.getItem('IS_LOGGED_IN');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    const [isInHome, setIsInHome] = useState(false);
    const [isInJungle, setIsInJungle] = useState(false);
    const [isInStudio, setIsInStudio] = useState(false);

    const [authEmail, setAuthEmail] = useState('');
    const [authRes, setAuthRes] = useState('');

    const [isCredentials, setIsCredentials] = useState(false);
    const [isNetworkFailure, setIsNetworkFailure] = useState(false);

    const [user, setUser] = useState<boolean | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const [isProfileLoading, setIsProfileLoading] = useState(false);

    const [userProfileData, setUserProfileData] = useState<UserDataProps | null>(null);

    async function fetchData() {
        setIsProfileLoading(true);

        try {
            const apiUrl = 'https://socialmediaapp-ugrr.onrender.com/profile';

            const config = {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authRes}`,
                },
            };

            const dataForPost: FormValues = {
                email: authEmail,
            };

            const res = await axios.post(apiUrl, dataForPost, config);

            setIsProfileLoading(false);

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
                newUserData.profileDescription = `Hello, I'm ${newUserData?.username}.`;
            }

            setUserProfileData(newUserData);

            // console.log('Successful: ', res.data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsProfileLoading(false);

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage === 'User not authenticated') {
                    // setIsProfileLoading(true);
                    // console.log('user indeed not authenticated');
                    // console.log('error: ', errorMessage);
                    // console.log('error: ', error.response);
                } else if (error.response.data.msg === 'Missing Authorization Header') {
                    // console.log('error:', error.response.data.msg);
                    // console.log('Missing Authorization Header INDEED');
                } else if (errorMessage === 'User not found') {
                    // console.log('user indeed not found');
                    // console.log('error: ', errorMessage);
                } else {
                    // console.log('error: SECOND', error.response);
                }
            } else {
                // console.log('error FINAL: ', error.response);
            }

            // window.location.href = '*';
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoginToggle,
                setIsLoginToggle,
                isSignupToggle,
                setIsSignupToggle,
                isLoggedIn,
                setIsLoggedIn,
                isInHome,
                setIsInHome,
                isInJungle,
                setIsInJungle,
                isInStudio,
                setIsInStudio,
                authEmail,
                setAuthEmail,
                authRes,
                setAuthRes,
                isCredentials,
                setIsCredentials,
                isNetworkFailure,
                setIsNetworkFailure,
                user,
                setUser,
                isRefreshing,
                setIsRefreshing,
                isEditProfileOpen,
                setIsEditProfileOpen,
                username,
                setUsername,
                bio,
                setBio,
                isProfileLoading,
                setIsProfileLoading,
                userProfileData,
                fetchData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
