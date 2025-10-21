import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthSuccess from './pages/AuthSuccess';
import AuthError from './pages/AuthError';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/success" element={<AuthSuccess />} />
                    <Route path="/auth/error" element={<AuthError />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
