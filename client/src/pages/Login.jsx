import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [contextReady, setContextReady] = useState(false);

    const contextValue = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (contextValue !== null && contextValue !== undefined) { 
            setContextReady(true);
        }
    }, [contextValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contextReady || !contextValue?.login) {
            setError('Auth service not ready. Please refresh.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                console.log('🔄 Attempting login...'); // Debug
                
                await contextValue.login(email, password);
                
                console.log('✅ Login success - going to dashboard'); // Debug
                // Direct success - go to dashboard
                navigate(contextValue.user?.role === 'admin' ? '/admin' : '/dashboard');
                
            } else {
                console.log('🔄 Verifying OTP...'); // Debug
                await contextValue.verifyOTP(email, otp);
                
                console.log('✅ OTP verified - going to dashboard'); // Debug
                navigate(contextValue.user?.role === 'admin' ? '/admin' : '/dashboard');
            }
        } catch (err) {
            console.error('❌ Login Error:', err); // 🔍 Debug
            
            // ✅ FORCE OTP for ANY login error (temporary fix)
            setShowOTP(true);
            setError('Please verify with OTP sent to your email.');
        } finally {
            setLoading(false);
        }
    };

    if (!contextReady) {
        return (
            <div className="max-w-md mx-auto mt-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Sign in to your BandBaajaBooker account</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {!showOTP ? (
                    <>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="bandbaajabooker@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimum 6 characters"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-green-800">
                                ✅ Enter OTP sent to <strong>{email}</strong>
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowOTP(false)} // Back to login
                                className="text-xs text-green-700 hover:underline mt-1"
                            >
                                Change Email
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter 6-digit OTP *</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 transition shadow-sm font-mono font-bold text-center text-xl tracking-widest"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="123456"
                            />
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading || (!showOTP && (!email || !password)) || (showOTP && otp.length !== 6)}
                    className="w-full bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-black focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Processing...' : showOTP ? '✅ Verify OTP & Login' : '🚀 Sign In'}
                </button>
            </form>

            <p className="text-center mt-8 text-sm text-gray-600 border-t pt-6">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-gray-900 hover:text-gray-700 hover:underline transition-colors">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;