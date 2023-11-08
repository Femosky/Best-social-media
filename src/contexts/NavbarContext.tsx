import { createContext, useContext, useState, ReactNode } from 'react';

type NavbarContextProps = {
    children?: ReactNode;
};

const NavContext = createContext<
    | {
          isSmall: boolean;
          setIsSmall: React.Dispatch<React.SetStateAction<boolean>>;
      }
    | undefined
>(undefined);

export function NavbarProvider({ children }: NavbarContextProps) {
    const [isSmall, setIsSmall] = useState(false);

    return <NavContext.Provider value={{ isSmall, setIsSmall }}>{children}</NavContext.Provider>;
}

export function useNavbar() {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error('useNavbar must be used within an AuthProvider');
    }
    return context;
}
