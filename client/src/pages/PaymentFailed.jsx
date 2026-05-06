import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCcw, Home } from 'lucide-react';
import { motion } from 'motion/react';

const PaymentFailed = () => {
    return (
        <div className="flex items-center justify-center py-20 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-lg border border-red-50"
            >
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle size={48} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
                <p className="text-gray-600 mb-10 leading-relaxed">
                    We're sorry, but there was an issue processing your payment. Please try again or use a different payment method.
                </p>
                <div className="space-y-4">
                    <button onClick={() => window.history.back()} className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all">
                        <RefreshCcw size={18} /> Try Again
                    </button>
                    <Link to="/" className="flex items-center justify-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-all">
                        <Home size={18} /> Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentFailed;
