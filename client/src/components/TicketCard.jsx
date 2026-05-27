import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaTicketAlt,
    FaUsers
} from 'react-icons/fa';

const TicketCard = ({ booking }) => {
    if (!booking || !booking.eventId) {
        return (
            <div className="p-8 text-center text-gray-500">
                No ticket available
            </div>
        );
    }

    const event = booking.eventId;

    const bookingId = `BBB${booking._id.slice(-8).toUpperCase()}`;

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    });

    return (
        <div className="w-full flex justify-center my-8 px-2">
            <div className="relative w-full max-w-6xl bg-black text-white rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/20">

                {/* Background Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200')] bg-cover bg-center opacity-15"></div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col lg:flex-row">

                    {/* LEFT SIDE */}
                    <div className="flex-1 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-dashed border-white/20">

                        {/* TOP */}
                        <div className="flex flex-col lg:flex-row gap-8">

                            {/* LOGO SIDE */}
                            <div className="flex flex-col items-center justify-center min-w-65">

                                <div className="w-64 h-64 rounded-full border-10 border-white flex items-center justify-center relative">

                                    <div className="absolute inset-5 rounded-full border-4 border-white"></div>

                                    <div className="text-center px-4">
                                        <div className="absolute inset-0 bg-[url('/workspaces/BandBaajaBooker/client/src/components/image/logoCreator_imagetologo.jpg')] bg-cover bg-center opacity-15"></div>

                                        <h2 className="text-3xl font-black tracking-[6px] uppercase">
                                            
                                        </h2>

                                        <p className="text-xs tracking-[4px] mt-2 text-gray-300 uppercase">
                                            
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-6 text-sm tracking-[4px] uppercase text-gray-300 text-center">
                                    Find Your Next Unforgettable Experience
                                </p>
                            </div>

                            {/* EVENT DETAILS */}
                            <div className="flex-1">

                                <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight tracking-wide">
                                    {event.title}
                                </h1>

                                <div className="inline-block mt-4 bg-white text-black px-5 py-2 font-bold uppercase tracking-widest text-sm rounded">
                                    Feel The Music. Live The Moment.
                                </div>

                                {/* DETAILS */}
                                <div className="mt-10 space-y-6">

                                    {/* DATE */}
                                    <div className="flex items-start gap-4">
                                        <FaCalendarAlt className="text-2xl mt-1" />
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                Date
                                            </p>

                                            <p className="text-xl font-bold uppercase">
                                                {formattedDate}
                                            </p>
                                        </div>
                                    </div>

                                    {/* TIME */}
                                    <div className="flex items-start gap-4">
                                        <FaClock className="text-2xl mt-1" />
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                Time
                                            </p>

                                            <p className="text-xl font-bold">
                                                7:00 PM ONWARDS
                                            </p>
                                        </div>
                                    </div>

                                    {/* VENUE */}
                                    <div className="flex items-start gap-4">
                                        <FaMapMarkerAlt className="text-2xl mt-1" />
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                Venue
                                            </p>

                                            <p className="text-xl font-bold uppercase">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CATEGORY */}
                                    <div className="flex items-start gap-4">
                                        <FaTicketAlt className="text-2xl mt-1" />
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                Category
                                            </p>

                                            <p className="text-xl font-bold uppercase">
                                                {event.category || 'VIP'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* TICKETS */}
                                    <div className="flex items-start gap-4">
                                        <FaUsers className="text-2xl mt-1" />
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                No. Of Tickets
                                            </p>

                                            <p className="text-xl font-bold">
                                                {booking.quantity || 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM STRIP */}
                        <div className="mt-10 bg-white text-black py-3 px-6 rounded-md flex items-center justify-center">
                            <p className="font-black tracking-[3px] uppercase text-center text-sm md:text-lg">
                                ★ Book. Experience. Unforgettable. ★
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full lg:w-[320px] bg-black flex flex-col items-center justify-between p-8 relative">

                        {/* TOP */}
                        <div className="w-full text-center">

                            <h2 className="text-5xl font-black tracking-widest uppercase">
                                Admit One
                            </h2>

                            <div className="w-full h-px bg-white/20 my-6"></div>

                            <p className="text-gray-400 uppercase tracking-widest text-sm">
                                Booking ID
                            </p>

                            <p className="text-3xl font-extrabold mt-2 break-all">
                                {bookingId}
                            </p>

                            {/* QR */}
                            <div className="bg-white p-5 rounded-2xl mt-8 inline-block">
                                <QRCodeSVG
                                    value={`${window.location.origin}/verify/${booking._id}`}
                                    size={180}
                                />
                            </div>
                        </div>

                        {/* BARCODE */}
                        <div className="w-full mt-10 text-center">

                            <div className="flex justify-center items-end gap-0.5 h-20">
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`bg-white ${
                                            i % 2 === 0
                                                ? 'w-0.5 h-full'
                                                : 'w-px h-14'
                                        }`}
                                    ></div>
                                ))}
                            </div>

                            <p className="mt-3 tracking-[8px] text-lg">
                                {bookingId}
                            </p>

                            {/* FOOTER ICON */}
                            <div className="mt-8 text-5xl relative">
                                <div className="absolute inset-0 bg-[url('/workspaces/BandBaajaBooker/client/src/components/image/logoCreator_imagetologo.jpg')] bg-cover bg-center opacity-15"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default TicketCard