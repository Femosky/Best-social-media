import { createContext, useContext, useState } from 'react';
import { ChildrenProps } from '../App';

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
      }
    | undefined
>(undefined);

export function AuthProvider({ children }: ChildrenProps) {
    const [isLoginToggle, setIsLoginToggle] = useState(false);
    const [isSignupToggle, setIsSignupToggle] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isInHome, setIsInHome] = useState(false);
    const [isInJungle, setIsInJungle] = useState(false);
    const [isInStudio, setIsInStudio] = useState(false);

    const [authEmail, setAuthEmail] = useState('');

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
