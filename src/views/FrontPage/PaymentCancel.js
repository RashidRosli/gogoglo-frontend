import React from 'react';

const PaymentCancelPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading/verification delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-gray-900">Transaction Status</h2>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            {/* Cancel Icon */}
            <div className="flex justify-center">
              <svg 
                className="w-16 h-16 text-red-500 animate-pulse-once" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center text-red-600 tracking-tight">
              Payment Canceled
            </h1>

            {/* Message */}
            <p className="text-center text-gray-600 text-lg">
              Your payment was not completed successfully.
            </p>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500">
              <p>You can try again or reach out to our support team if the issue persists.</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <button 
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => window.location.href = '/checkout'} // Replace with your checkout route
              >
                Try Again
              </button>
              <button 
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => window.location.href = '/support'} // Replace with your support route
              >
                Contact Support
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
// <Route path="/cancel" element={<PaymentCancelPage />} />

export default PaymentCancelPage;