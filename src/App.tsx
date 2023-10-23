import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './layouts/Navbar';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
