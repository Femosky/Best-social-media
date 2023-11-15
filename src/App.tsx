import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Navbar } from './layouts/Navbar';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Error404 } from './pages/Error404';
import { NavbarProvider } from './contexts/NavbarContext';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from './layouts/Footer';

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
    return (
        <>
            <Navbar />
            <div className={`mt-10 font-plusJakarta px-4 md:px-24 flex-1`}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
