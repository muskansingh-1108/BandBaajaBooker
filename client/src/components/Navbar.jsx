import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // ✅ Added
import { Music, LogOut } from 'lucide-react';
import logoImg from './image/logoCreator_imagetologo.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const user = context?.user;
    const logout = context?.logout;

    // If context not ready, render nothing or loading
    if (!context) {
        return (
            <nav className="h-20 px-4 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            </nav>
        );
    }

    const handleLogout = () => {
        logout();  // ✅ AuthContext logout
        navigate('/login', { replace: true });
    };

    return (
        <nav className="h-20 px-4 sm:px-10 flex items-center justify-between border-b border-natural-border bg-white/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3">
                    <div
                        className="w-18 h-18 rounded-full bg-cover bg-center shadow-md border border-white/20"
                        style={{
                            backgroundImage: `url(${logoImg})`
                        }}
                    ></div>
                    <span className="text-2xl font-serif font-bold tracking-tight text-natural-dark">
                        <span className="italic text-natural-accent">BandBaajaBooker</span>
                    </span>
                </Link>
            </div>

            <div className="flex items-center gap-4 sm:gap-8 text-sm font-medium text-natural-muted">
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="hover:text-natural-accent transition-colors">
                            My Bookings
                        </Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="hover:text-natural-accent transition-colors">
                                Admin
                            </Link>
                        )}
                        <div className="h-6 w-px bg-natural-border mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-natural-accent/10 flex items-center justify-center text-natural-accent font-bold text-xs ring-2 ring-natural-accent/20">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="p-2 text-natural-muted hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="hover:text-natural-accent transition-colors">
                            Sign In
                        </Link>
                        <Link 
                            to="/register" 
                            className="px-6 py-2.5 bg-natural-dark text-natural-bg rounded-full hover:bg-natural-dark/90 transition-all shadow-md"
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;