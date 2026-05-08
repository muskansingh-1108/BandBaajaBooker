import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="space-y-16">
            <section className="text-center py-20 px-4 bg-[radial-gradient(circle_at_top_right,#6b1b3e,transparent)] rounded-3xl">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-7xl font-serif font-bold text-natural-dark tracking-tight leading-tight"
                >
                    Find Your Next <span className="italic text-natural-accent underline decoration-natural-accent/30">Unforgettable</span> Experience
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8 text-xl text-natural-muted max-w-2xl mx-auto font-medium"
                >
                    Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex flex-wrap justify-center gap-6"
                >
                    <Link to="/register" className="px-10 py-4 bg-natural-dark text-natural-bg rounded-full font-bold hover:bg-natural-dark/90 transition-all shadow-xl hover:shadow-2xl">
                        Explore Events
                    </Link>
                    <Link to="/login" className="px-10 py-4 bg-white text-natural-dark border border-natural-border rounded-full font-bold hover:bg-white/80 transition-all shadow-sm">
                        Host Your Own
                    </Link>
                </motion.div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {[
                    { title: 'Fast Booking', desc: 'Secure your tickets instantly with our streamlined infrastructure built for speed.', color: 'bg-natural-accent', icon: Calendar },
                    { title: 'Seamless Access', desc: 'Download tickets instantly or manage them right from your personal dashboard.', color: 'bg-natural-dark', icon: Users },
                    { title: 'Secure Platform', desc: 'All transactions are protected by cutting-edge security and 2FA OTP technology.', color: 'bg-natural-muted', icon: MapPin }
                ].map((feature, idx) => (
                    <div key={idx} className="p-8 bg-white/40 border border-natural-border rounded-[2.5rem] shadow-sm backdrop-blur-sm">
                        <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                            <feature.icon size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-natural-dark mb-4">{feature.title}</h3>
                        <p className="text-natural-muted leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </section>

            <section className="px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-serif font-bold text-natural-dark">Available in <span className="italic text-natural-accent">Udaipur</span></h2>
                        <p className="text-natural-muted mt-2 font-medium">Premium troupes and experiences ready for your celebration.</p>
                    </div>
                    <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-natural-border">
                        <button className="px-6 py-2 bg-natural-accent/10 text-natural-accent rounded-xl text-sm font-bold">Grid</button>
                        <button className="px-6 py-2 text-sm text-natural-muted font-medium">List</button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse bg-white/50 rounded-4xl h-96 border border-natural-border"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event) => (
                            <motion.div 
                                key={event._id}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-4xl overflow-hidden shadow-sm border border-natural-border group flex flex-col"
                            >
                                <div className="h-56 bg-natural-border relative overflow-hidden">
                                    <img 
                                        src={event.image || `https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop`} 
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-natural-accent shadow-sm">
                                        {event.category || 'Vocal'}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <h3 className="text-2xl font-serif font-bold text-natural-dark group-hover:text-natural-accent transition-colors leading-tight">{event.title}</h3>
                                    <p className="text-natural-muted text-sm mt-3 line-clamp-2">Premium experience with top-tier vendors and professional coordination.</p>
                                    
                                    <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-natural-muted uppercase tracking-tighter">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-natural-accent" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-natural-accent" />
                                            <span>{event.availableSeats} of {event.totalSeats} seats</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-auto pt-8 border-t border-natural-border flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-natural-muted font-bold uppercase tracking-widest">Entry From</span>
                                            <span className="text-2xl font-black text-natural-dark">₹{event.price || 'Priceless'}</span>
                                        </div>
                                        <Link 
                                            to={`/events/${event._id}`}
                                            className="px-6 py-3 bg-natural-accent #1e293b rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-natural-accent/20 transition-all flex items-center gap-2"
                                        >
                                            View Details <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <section className="bg-natural-dark rounded-[3rem] p-12 md:p-20 text-center text-natural-bg relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,115,0.2),transparent)] pointer-events-none"></div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-2xl mx-auto">Make your next celebration <span className="italic text-natural-accent">truly legendary</span></h2>
                <p className="text-natural-bg/70 mb-12 max-w-xl mx-auto text-lg">
                    The simplest, most cultural way to manage, discover, and host world-class events in your city.
                </p>
                <Link to="/register" className="inline-block px-12 py-5 bg-natural-accent text-natural-bg rounded-full font-bold hover:bg-natural-accent/90 transition-all shadow-xl">
                    Start Your Journey
                </Link>
            </section>
        </div>
    );
};

export default Home;
