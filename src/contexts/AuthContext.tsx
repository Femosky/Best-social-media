import { createContext, useContext, useState } from 'react';
import { ChildrenProps } from '../App';

const AuthContext = createContext<
    | {
          isLoginToggle: boolean;
          setIsLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
          isSignupToggle: boolean;
          setIsSignupToggle: React.Dispatch<React.SetStateAction<boolean>>;
      }
    | undefined
>(undefined);

export function AuthProvider({ children }: ChildrenProps) {
    const [isLoginToggle, setIsLoginToggle] = useState(false);
    const [isSignupToggle, setIsSignupToggle] = useState(true);

    return (
        <AuthContext.Provider value={{ isLoginToggle, setIsLoginToggle, isSignupToggle, setIsSignupToggle }}>
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
