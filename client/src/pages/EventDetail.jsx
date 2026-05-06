import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { Calendar, MapPin, Users, Ticket, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                if (id) {
                    const response = await api.get(`/events/${id}`);
                    setEvent(response.data);
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
            return;
        }

        setBooking(true);
        try {
            await api.post('/bookings', { eventId: id });
            navigate('/payment-success');
        } catch (error) {
            console.error("Booking error:", error);
            navigate('/payment-failed');
        } finally {
            setBooking(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (!event) return <div className="text-center py-20 text-gray-500">Event not found.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
            >
                <ChevronLeft size={20} /> Back to Events
            </button>

            <div className="bg-white/60 backdrop-blur-md rounded-[3rem] overflow-hidden shadow-sm border border-natural-border">
                <div className="h-64 md:h-120 w-full relative">
                    <img 
                        src={event.image || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop`} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-8 left-8 bg-natural-accent text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                        {event.category || 'Featured Troupe'}
                    </div>
                </div>

                <div className="p-8 md:p-16">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
                        <div className="grow">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-dark leading-tight">{event.title}</h1>
                            <p className="mt-8 text-natural-muted font-medium text-lg leading-relaxed max-w-2xl">
                                {event.description || "Join us for an incredible experience at this specially curated event. We bring together experts and enthusiasts for a day of learning, connectivity, and fun."}
                            </p>

                            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { label: 'Date & Time', val: `${new Date(event.date).toLocaleDateString()} • ${event.time || "7:00 PM"}`, icon: Calendar },
                                    { label: 'Location', val: event.location || "Central Auditorium, Udaipur", icon: MapPin },
                                    { label: 'Availability', val: `${event.availableSeats} of ${event.totalSeats} seats remaining`, icon: Users }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-natural-dark">
                                        <div className="w-12 h-12 bg-natural-accent/5 rounded-2xl flex items-center justify-center text-natural-accent shadow-sm border border-natural-accent/10">
                                            <item.icon size={22} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-natural-accent font-black uppercase tracking-widest">{item.label}</p>
                                            <p className="font-bold text-lg">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-80 bg-white rounded-4xl p-10 border border-natural-border shadow-2xl shadow-natural-accent/5 shrink-0 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-natural-accent"></div>
                            <p className="text-[10px] text-natural-accent font-black uppercase tracking-widest mb-4">Investment</p>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-4xl font-black text-natural-dark">₹{event.price || '999'}</span>
                                <span className="text-natural-muted text-sm font-bold">/ seat</span>
                            </div>
                            
                            <button 
                                onClick={handleBooking}
                                disabled={booking || event.availableSeats === 0}
                                className={`w-full py-5 rounded-2xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-3 ${
                                    event.availableSeats === 0 
                                        ? 'bg-natural-muted cursor-not-allowed' 
                                        : 'bg-natural-accent hover:bg-natural-accent/90 hover:scale-[1.02]'
                                }`}
                            >
                                <Ticket size={24} />
                                {booking ? 'Processing...' : event.availableSeats === 0 ? 'Waitlist Only' : 'Confirm Spot'}
                            </button>
                            <p className="text-center text-[10px] text-natural-muted font-bold mt-6 tracking-widest uppercase">
                                Verified by BandBaajaBooker
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
