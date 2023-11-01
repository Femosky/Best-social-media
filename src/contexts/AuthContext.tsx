import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextProps = {
    children?: ReactNode;
};

const AuthContext = createContext<
    | {
          isLoginToggle: boolean;
          setIsLoginToggle: React.Dispatch<React.SetStateAction<boolean>>;
          isSignupToggle: boolean;
          setIsSignupToggle: React.Dispatch<React.SetStateAction<boolean>>;
      }
    | undefined
>(undefined);

export function AuthProvider({ children }: AuthContextProps) {
    const [isLoginToggle, setIsLoginToggle] = useState(false);
    const [isSignupToggle, setIsSignupToggle] = useState(true);

    return (
        <AuthContext.Provider value={{ isLoginToggle, setIsLoginToggle, isSignupToggle, setIsSignupToggle }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}