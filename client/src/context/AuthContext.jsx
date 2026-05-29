import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userInfo && token) {
            try {
                setUser(JSON.parse(userInfo));
            } catch (e) {
                console.error('Invalid user data in localStorage');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data.user || data));
            localStorage.setItem('token', data.token);
            setUser(data.user || data);
            return data;
        } catch (error) {
            if (error.response?.data?.needsVerification) throw error.response.data;
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    };

    const verifyOTP = async (email, otp) => {
        const { data } = await api.post('/auth/verify-otp', { email, otp });
        localStorage.setItem('user', JSON.stringify(data.user || data));
        localStorage.setItem('token', data.token);
        setUser(data.user || data);
        return data;
    };

    // NEW: Send OTP for login
    const sendLoginOTP = async (email) => {
        try {
            const { data } = await api.post('/auth/send-login-otp', { email });
            return data;
        } catch (error) {
            throw error.response?.data || error;
        }
    };

    // NEW: Verify OTP for login
    const verifyLoginOTP = async (email, otp) => {
        try {
            const { data } = await api.post('/auth/verify-login-otp', { email, otp });
            localStorage.setItem('user', JSON.stringify(data.user || data));
            localStorage.setItem('token', data.token);
            setUser(data.user || data);
            return data;
        } catch (error) {
            throw error.response?.data || error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        login,
        register,
        verifyOTP,
        sendLoginOTP,
        verifyLoginOTP,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};