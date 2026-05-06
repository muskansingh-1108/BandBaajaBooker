import React, { useEffect, useState } from 'react';
import api from '../utils/axios';
import { motion } from 'motion/react';
import { Settings, Plus, Edit, Trash2, CheckCircle, Clock, Calendar } from 'lucide-react';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [eventsRes, bookingsRes] = await Promise.all([
                    api.get('/events'),
                    api.get('/bookings')
                ]);
                setEvents(eventsRes.data);
                setAllBookings(bookingsRes.data);
            } catch (error) {
                console.error("Admin data error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-4xl font-black text-gray-900">Admin Command Center</h1>
                    <p className="text-gray-500 mt-2 font-medium">Control tower for all events and bookings across the galaxy.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-200 transition-all">
                        <Plus size={20} /> New Event
                    </button>
                    <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Events', val: events.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Total Bookings', val: allBookings.length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Active Users', val: '1,204', icon: Settings, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Total Revenue', val: '₹12.5L', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stat.val}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Manage Events</h2>
                        <button className="text-sm font-bold text-blue-600">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase">
                                <tr>
                                    <th className="px-6 py-4">Event</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {events.slice(0, 5).map(event => (
                                    <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{event.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">ACTIVE</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                                                <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                        <button className="text-sm font-bold text-blue-600">Download CSV</button>
                    </div>
                    <div className="p-6 space-y-4">
                        {allBookings.slice(0, 5).map(booking => (
                            <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-sm text-blue-600 shadow-sm">
                                        {booking.user?.name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{booking.user?.name || 'Guest User'}</p>
                                        <p className="text-xs text-gray-400">{booking.event?.title}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">₹{booking.event?.price || '999'}</p>
                                    <p className="text-[10px] font-bold text-green-600 uppercase">Paid</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
