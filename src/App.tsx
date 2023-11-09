import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './layouts/Navbar';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Profile } from './pages/Profile';
import { Error404 } from './pages/Error404';
import { NavbarProvider, useNavbar } from './contexts/NavbarContext';
import { ReactNode } from 'react';

export type ChildrenProps = {
    children?: ReactNode;
};

function AppProviders({ children }: ChildrenProps) {
    return (
        <AuthProvider>
            <NavbarProvider>{children}</NavbarProvider>
        </AuthProvider>
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
    const { isSmall } = useNavbar();

    return (
        <>
            <Navbar />
            <div className={`mt-10 font-plusJakarta ${!isSmall ? 'overflow-hidden' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
