import React from 'react';

const PaymentSuccessPage = () => {
    // Simulate loading state (you might want to connect this to actual payment verification)
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate API call or payment verification
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <>

            <div className="min-h-screen flex flex-col bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-semibold text-gray-900">Booking Confirmation</h2>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                        {/* Success Icon */}
                        <div className="flex justify-center">
                            <svg
                                className="w-16 h-16 text-emerald-500 animate-pulse-once"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl font-bold text-center text-emerald-600 tracking-tight">
                            Payment Successful!
                        </h1>

                        {/* Message */}
                        <p className="text-center text-gray-600 text-lg">
                            Your booking has been confirmed successfully.
                        </p>

                        {/* Additional Info */}
                        <div className="text-center text-sm text-gray-500">
                            <p>A confirmation email has been sent to your inbox.</p>
                            <p>Check your spam folder if you don't see it.</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 space-y-3">
                            <button
                                className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                onClick={() => window.location.href = '/booking-details'}
                            >
                                View Booking Details
                            </button>
                            <button
                                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                onClick={() => window.location.href = '/'}
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
};

// Add to your router configuration (example with React Router)
// <Route path="/success" element={<PaymentSuccessPage />} />

export default PaymentSuccessPage;