import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './layouts/Navbar';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { Profile } from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className={`mt-10 font-plusJakarta`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
