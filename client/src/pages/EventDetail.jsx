import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave } from 'react-icons/fa';

import { QRCodeSVG } from 'qrcode.react';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);


    const [lastBookingId, setLastBookingId] = useState(null);

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [showPayment, setShowPayment] = useState(false);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                const { data } = await api.post('/bookings', { eventId: event._id, otp });
                setLastBookingId(data.booking._id);
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                // Show payment button after successful booking
                setShowPayment(true);
                // Update local seats count dynamically after booking
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
    if (error && !event) return <div className="text-center py-20 text-xl text-red-500">{error || 'Event not found'}</div>;

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
            {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
            ) : (
                <div className="w-full h-64 bg-gray-900 flex items-center justify-center text-white/50 text-6xl font-black uppercase tracking-widest">
                    {event.category}
                </div>
            )}

            <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                    <div>
                        <div className="inline-block bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                            {event.category}
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{event.title}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{event.description}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-w-75 w-full md:w-auto shrink-0 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaMoneyBillWave />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Ticket Price</p>
                                    <p className="font-bold text-gray-800 text-lg">{event.ticketPrice === 0 ? <span className="text-green-500">Free</span> : `₹${event.ticketPrice}`}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaChair />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Availability</p>
                                    <p className="font-bold text-gray-800">
                                        <span className={event.availableSeats < 10 ? 'text-orange-500' : ''}>{event.availableSeats}</span> / {event.totalSeats}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Date</p>
                                    <p className="font-bold text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Location</p>
                                    <p className="font-bold text-gray-800">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {showOTP && (
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP to Confirm</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="6-digit code"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg ${isSoldOut || (successMsg && !showOTP)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-black text-white hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            {bookingLoading ? 'Processing...' : (showOTP ? 'Verify OTP & Confirm' : (successMsg && !showOTP ? 'Request Sent' : (isSoldOut ? 'Sold Out' : 'Confirm Registration')))}
                        </button>

                        {showPayment && (
                            <button
                                onClick={() => setShowQR(true)}
                                className="w-full mt-4 py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:-translate-y-1"
                            >
                                💳 Proceed to Payment
                            </button>
                        )}
                        {error && <p className="text-red-500 mt-4 text-center font-medium bg-red-50 p-2 rounded">{error}</p>}
                        {successMsg && <p className="text-green-600 mt-4 text-center font-medium bg-green-50 p-2 rounded">{successMsg}</p>}
                    </div>
                </div>
            </div>

            {showQR && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-xl max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold mb-4">Scan to Pay</h3>
                        <p className="mb-4 text-gray-600">Amount: ₹{event.ticketPrice}</p>
                        <div className="bg-white p-4 border inline-block">
                            <QRCodeSVG 
                                value={`upi://pay?pa=9661359851@ybl&pn=BandBaajaBooker&am=${event.ticketPrice}&cu=INR`} 
                                size={250}
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Scan using any UPI App (GPay, PhonePe, Paytm)
                        </p>

                        <button
                            onClick={() => {
                                setShowQR(false);
                                navigate(`/payment-success?bookingId=${lastBookingId}`);
                            }}
                            className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-bold"
                        >
                            Done - Go to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetail;