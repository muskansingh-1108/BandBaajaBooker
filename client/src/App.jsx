import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Music } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';  
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import Navbar from './components/Navbar';

function App() {
    return (
        <AuthProvider>  
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/events/:id" element={<EventDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />  
                            <Route path="/dashboard" element={<UserDashboard />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/payment-success" element={<PaymentSuccess />} />
                            <Route path="/payment-failed" element={<PaymentFailed />} />
                            <Route path="*" element={
                                <h1 className="text-4xl font-black text-center mt-32 text-gray-900">
                                    404 <span className="text-gray-400 font-medium">Page Not Found</span>
                                </h1>
                            } />
                        </Routes>
                    </main>
                    <footer className="bg-natural-dark text-natural-bg py-16 mt-20 px-4">
                        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-natural-accent rounded-full flex items-center justify-center text-white">
                                    <Music size={16} />
                                </div>
                                <span className="text-xl font-serif font-bold tracking-tight">BandBaajaBooker</span>
                            </div>
                            <p className="text-natural-bg/50 text-xs font-medium tracking-widest uppercase">
                                © 2026 BandBaajaBooker. All celebrations secured.
                            </p>
                            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-natural-bg/70">
                                <a href="#" className="hover:text-natural-accent transition-colors">Support</a>
                                <a href="#" className="hover:text-natural-accent transition-colors">Privacy</a>
                                <a href="#" className="hover:text-natural-accent transition-colors">Terms</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthProvider>  
    );
}

export default App;