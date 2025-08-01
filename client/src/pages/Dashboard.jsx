// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Dashboard = () => {
// //   const [destination, setDestination] = useState('');
// //   const [days, setDays] = useState('');
// //   const [budget, setBudget] = useState('medium');
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   // Check if user is logged in
// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       navigate('/login');
// //     }
// //   }, [navigate]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/trips/create', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify({
// //           destination,
// //           days: parseInt(days),
// //           budget
// //         }),
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         // Get the trip ID from the response
// //         const tripId = data.data.tripId || data.data.trip._id;
        
// //         if (tripId) {
// //           // Navigate to the trip results page
// //           navigate(`/trip/${tripId}`);
// //         } else {
// //           alert('🎉 Trip created successfully!');
// //           // Reset form as fallback
// //           setDestination('');
// //           setDays('');
// //           setBudget('medium');
// //         }
// //       } else {
// //         alert('Error: ' + data.message);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert('Error: Make sure your server is running');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     navigate('/');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
// //       <div className="max-w-2xl mx-auto">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-8">
// //           <h1 className="text-3xl font-bold">✈️ Trip-AI Dashboard</h1>
// //           <button onClick={handleLogout} className="btn-secondary">
// //             Logout
// //           </button>
// //         </div>

// //         {/* Trip Form */}
// //         <div className="card p-8">
// //           <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
          
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Destination</label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g., Paris, Tokyo, New York"
// //                 value={destination}
// //                 onChange={(e) => setDestination(e.target.value)}
// //                 className="input-field"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-2">Duration (days)</label>
// //               <select
// //                 value={days}
// //                 onChange={(e) => setDays(e.target.value)}
// //                 className="input-field"
// //                 required
// //               >
// //                 <option value="">Select days</option>
// //                 <option value="3">3 days</option>
// //                 <option value="5">5 days</option>
// //                 <option value="7">7 days</option>
// //                 <option value="10">10 days</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-2">Budget</label>
// //               <select
// //                 value={budget}
// //                 onChange={(e) => setBudget(e.target.value)}
// //                 className="input-field"
// //               >
// //                 <option value="budget">Budget (Under $100/day)</option>
// //                 <option value="medium">Medium ($100-300/day)</option>
// //                 <option value="luxury">Luxury ($300+/day)</option>
// //               </select>
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="btn-primary w-full text-lg py-3"
// //             >
// //               {loading ? (
// //                 <span className="flex items-center justify-center gap-2">
// //                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                   Creating your amazing trip...
// //                 </span>
// //               ) : (
// //                 '🚀 Generate Trip with AI'
// //               )}
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/pages/Dashboard.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [destination, setDestination] = useState('');
//   const [days, setDays] = useState('');
//   const [budget, setBudget] = useState('medium');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   // Handle form submission and redirect on success
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('/api/trips/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           destination,
//           days: Number(days),
//           budget,
//         }),
//       });

//       const result = await res.json();

//       if (result.success && result.data?.tripId) {
//         // Guaranteed redirection using the single tripId field
//         navigate(`/trip/${result.data.tripId}`);
//       } else {
//         alert(result.message || 'Trip creation failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Network error. Please check your server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">✈️ Trip-AI Dashboard</h1>
//           <button onClick={handleLogout} className="btn-secondary">
//             Logout
//           </button>
//         </div>

//         {/* Trip Planning Form */}
//         <div className="card p-8">
//           <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Destination</label>
//               <input
//                 type="text"
//                 placeholder="e.g., Paris, Tokyo"
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 className="input-field"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Duration (days)</label>
//               <select
//                 value={days}
//                 onChange={(e) => setDays(e.target.value)}
//                 className="input-field"
//                 required
//               >
//                 <option value="">Select days</option>
//                 {[3, 5, 7, 10].map((d) => (
//                   <option key={d} value={d}>
//                     {d} days
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Budget</label>
//               <select
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//                 className="input-field"
//               >
//                 <option value="budget">Budget (Under $100/day)</option>
//                 <option value="medium">Medium ($100-300/day)</option>
//                 <option value="luxury">Luxury ($300+/day)</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full text-lg py-3 disabled:opacity-50"
//             >
//               {loading ? 'Creating Trip…' : '🚀 Generate Trip with AI'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('🔒 No token found, redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  // Handle trip creation with detailed logging
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 Starting trip creation...');
    console.log('📝 Form data:', { destination, days, budget });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('🔗 Making API request to create trip...');

      const response = await fetch('http://localhost:5000/api/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          destination: destination.trim(),
          days: parseInt(days),
          budget: budget
        })
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (data.success) {
        console.log('✅ Trip created successfully!');
        
        // Extract trip ID from response
        const tripId = data.data?.tripId;
        
        if (tripId) {
          console.log(`🎯 Navigating to trip results: /trip/${tripId}`);
          
          // Small delay to ensure state updates complete
          setTimeout(() => {
            navigate(`/trip/${tripId}`);
          }, 100);
          
        } else {
          console.error('❌ No tripId in response:', data);
          setError('Trip created but navigation failed. Check console.');
        }
      } else {
        console.error('❌ Trip creation failed:', data.message);
        setError(data.message || 'Failed to create trip');
      }

    } catch (error) {
      console.error('❌ Network/Server Error:', error);
      setError(`Network error: ${error.message}. Make sure your server is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('👋 Logging out user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ✈️ Trip-AI Dashboard
          </h1>
          <button 
            onClick={handleLogout} 
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Trip Planning Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Plan Your Trip
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Destination
              </label>
              <input
                type="text"
                placeholder="e.g., Paris, Tokyo, New York"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              />
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Duration (days)
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              >
                <option value="">Select duration</option>
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
                <option value="10">10 days</option>
                <option value="14">14 days</option>
              </select>
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Budget Level
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="input-field"
                disabled={loading}
              >
                <option value="budget">Budget (Under $100/day)</option>
                <option value="medium">Medium ($100-300/day)</option>
                <option value="luxury">Luxury ($300+/day)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !destination || !days}
              className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating your amazing trip...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚀 Generate Trip with AI
                </span>
              )}
            </button>
          </form>

          {/* Loading Status */}
          {loading && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-center text-blue-800 dark:text-blue-200">
                <div className="text-lg font-medium">✨ AI is working its magic...</div>
                <div className="text-sm mt-1">
                  Generating personalized recommendations for {destination}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
