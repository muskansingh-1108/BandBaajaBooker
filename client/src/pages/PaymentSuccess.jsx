import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Ticket } from 'lucide-react';
import { motion } from 'motion/react';

const PaymentSuccess = () => {
    return (
        <div className="flex items-center justify-center py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-lg border border-green-50"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    Great news! Your booking has been confirmed and payment received. Check your email for the ticket confirmation.
                </p>
                <div className="space-y-4">
                    <Link to="/dashboard" className="block w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all items-center justify-center gap-2">
                        <Ticket size={20} /> View My Tickets
                    </Link>
                    <Link to="/" className="flex items-center justify-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                        Go Home <ArrowRight size={18} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;