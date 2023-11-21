import { createContext, useContext, useState } from 'react';
import { ChildrenProps } from '../App';

const NavContext = createContext<
    | {
          isSmall: boolean;
          setIsSmall: React.Dispatch<React.SetStateAction<boolean>>;
          isPostActive: boolean;
          setIsPostActive: React.Dispatch<React.SetStateAction<boolean>>;
      }
    | undefined
>(undefined);

export function NavbarProvider({ children }: ChildrenProps) {
    const [isSmall, setIsSmall] = useState(false);
    const [isPostActive, setIsPostActive] = useState(false);

    return (
        <NavContext.Provider value={{ isSmall, setIsSmall, isPostActive, setIsPostActive }}>
            {children}
        </NavContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavbar() {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error('useNavbar must be used within an NavbarProvider');
    }
    return context;
}
