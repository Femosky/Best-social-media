import { createContext, useContext, useState } from 'react';
import { ChildrenProps } from '../App';

const NavContext = createContext<
    | {
          isSmall: boolean;
          setIsSmall: React.Dispatch<React.SetStateAction<boolean>>;
      }
    | undefined
>(undefined);

export function NavbarProvider({ children }: ChildrenProps) {
    const [isSmall, setIsSmall] = useState(false);

    return <NavContext.Provider value={{ isSmall, setIsSmall }}>{children}</NavContext.Provider>;
}

export function useNavbar() {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error('useNavbar must be used within an NavbarProvider');
    }
    return context;
}
