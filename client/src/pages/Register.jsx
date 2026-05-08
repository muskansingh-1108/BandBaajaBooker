import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
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
        

        if (!contextReady || !contextValue?.register) {
            setError('Auth service not ready. Please refresh.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                await contextValue.register(name, email, password);
                setShowOTP(true);
            } else {
                await contextValue.verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err?.message || 'Something went wrong!');
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an Account</h2>
                <p className="text-gray-500">Join BandBaajaBooker today</p>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 transition shadow-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="BandBaajaBooker"
                            />
                        </div>
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
                                minLength={6}
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
                                ✅ OTP sent to <strong>{email}</strong>
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP *</label>
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
                    disabled={loading || (!showOTP && (!name || !email || password.length < 6)) || (showOTP && otp.length !== 6)}
                    className="w-full bg-linear-to-r from-gray-800 to-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:from-gray-900 hover:to-black focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '⏳ Processing...' : showOTP ? '✅ Verify OTP' : '🚀 Create Account'}
                </button>
            </form>

            {!showOTP && (
                <p className="text-center mt-8 text-sm text-gray-600 border-t pt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-gray-900 hover:text-gray-700 hover:underline transition-colors">
                        Sign In
                    </Link>
                </p>
            )}
        </div>
    );
};

export default Register;