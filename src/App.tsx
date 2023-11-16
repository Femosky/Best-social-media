import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Navbar } from './layouts/Navbar';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Error404 } from './pages/Error404';
import { NavbarProvider } from './contexts/NavbarContext';
import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from './layouts/Footer';
import { Jungle } from './pages/Jungle';
import { Studio } from './pages/Studio';
import { LoaderLogo } from './layouts/LoaderLogo';

export type ChildrenProps = {
    children?: ReactNode;
};

function AppProviders({ children }: ChildrenProps) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                <NavbarProvider>{children}</NavbarProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

function App() {
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    );
}

function AppContent() {
    const { setUser } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        function handleBeforeUnload() {
            localStorage.setItem('isRefreshing', 'true');
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            localStorage.removeItem('isRefreshing');
        };
    }, []);

    useEffect(() => {
        const storedIsRefreshing = localStorage.getItem('isRefreshing');
        const isRefreshed = storedIsRefreshing === 'true';

        if (isRefreshed) {
            console.log('Page is being refreshed');
            setIsRefreshing(true);

            setTimeout(() => {
                setIsRefreshing(false);
                setUser(true);
            }, 600);
        } else {
            setUser(true);
        }

        // Cleanup (optional)
        return () => {
            setUser(null);
        };
    }, [setUser]);

    return (
        <>
            {isRefreshing && <LoaderLogo className="flex absolute bg-white z-[1000]" />}
            <Navbar />
            <div className={`mt-10 font-plusJakarta px-4 md:px-24 flex-1`}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="jungle" element={<Jungle />} />
                    <Route path="studio" element={<Studio />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
