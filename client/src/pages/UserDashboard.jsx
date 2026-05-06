import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import { motion } from 'motion/react';
import { Calendar, Tag, CreditCard, ChevronRight } from 'lucide-react';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mt-2">Manage your tickets and explore upcoming experiences.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Tag size={20} className="text-blue-600" /> My Bookings
                    </h2>

                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100"></div>)}
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-500">You haven't booked any events yet.</p>
                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">Explore Events</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <motion.div 
                                    key={booking._id}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                                >
                                    <div className="w-full sm:w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                        <img 
                                            src={booking.event?.image || `https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&auto=format&fit=crop`} 
                                            alt="" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="grow text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-gray-900">{booking.event?.title || 'Unknown Event'}</h3>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'TBD'}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                                booking.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                                            }`}>
                                                {booking.status?.toUpperCase() || 'PENDING'}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-400 group transition-colors">
                                        <ChevronRight size={20} className="group-hover:text-blue-600" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Profile Overview</h2>
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span className="font-medium text-gray-900">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Member Since</span>
                                <span className="font-medium text-gray-900">May 2026</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">Edit Profile</button>
                    </div>

                    <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
                        <CreditCard className="mb-4 opacity-80" size={24} />
                        <h2 className="text-lg font-bold mb-1">Loyalty Points</h2>
                        <p className="text-3xl font-black mb-4">420 pts</p>
                        <p className="text-xs text-blue-100">You're only 80 points away from your next discount voucher!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
