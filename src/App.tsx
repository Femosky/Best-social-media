import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './layouts/Navbar';
import { Login } from './pages/Login';

function App() {
    return (
        // <div className="w-[1440px] h-[1184px]">
        <Router>
            <Navbar />
            <div className="mt-10 font-plusJakarta">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
        // </div>
    );
}

export default App;
