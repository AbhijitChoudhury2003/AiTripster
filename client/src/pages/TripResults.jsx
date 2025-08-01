// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate, Link } from 'react-router-dom';
// // // import { ArrowLeft, MapPin, Calendar, DollarSign, Sparkles, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
// // // import ThemeToggle from '../components/ThemeToggle';

// // // const TripResults = () => {
// // //   const { tripId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [trip, setTrip] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [expandedSections, setExpandedSections] = useState({});

// // //   // Load trip data on component mount
// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) {
// // //       navigate('/login');
// // //       return;
// // //     }
// // //     loadTripDetails();
// // //   }, [tripId, navigate]);

// // //   // Fetch trip details from backend
// // //   const loadTripDetails = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`
// // //         }
// // //       });

// // //       const data = await response.json();

// // //       if (data.success) {
// // //         setTrip(data.data.trip);
// // //       } else {
// // //         setError('Trip not found');
// // //       }
// // //     } catch {
// // //       setError('Failed to load trip details');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Simple logout function
// // //   const handleLogout = () => {
// // //     localStorage.removeItem('token');
// // //     navigate('/');
// // //   };

// // //   // Toggle accordion sections
// // //   const toggleSection = (sectionKey) => {
// // //     setExpandedSections(prev => ({
// // //       ...prev,
// // //       [sectionKey]: !prev[sectionKey]
// // //     }));
// // //   };

// // //   // Parse AI response into structured sections
// // //   const parseAIResponse = (aiResponse) => {
// // //     if (!aiResponse) return [];

// // //     const sections = [];
// // //     const lines = aiResponse.split('\n').filter(line => line.trim());
// // //     let currentSection = null;

// // //     lines.forEach(line => {
// // //       const trimmedLine = line.trim();
      
// // //       // Detect section headers (lines with emojis and **bold** text)
// // //       if (trimmedLine.includes('**') && /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u.test(trimmedLine)) {
// // //         if (currentSection) {
// // //           sections.push(currentSection);
// // //         }
// // //         currentSection = {
// // //           title: trimmedLine.replace(/\*\*/g, ''),
// // //           content: [],
// // //           key: trimmedLine.toLowerCase().replace(/[^a-z0-9]/g, '')
// // //         };
// // //       } else if (currentSection && trimmedLine) {
// // //         currentSection.content.push(trimmedLine);
// // //       }
// // //     });

// // //     if (currentSection) {
// // //       sections.push(currentSection);
// // //     }

// // //     return sections;
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-xl text-gray-600 dark:text-gray-400">Loading your amazing trip...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="text-6xl mb-4">😞</div>
// // //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h2>
// // //           <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
// // //           <Link to="/dashboard" className="btn-primary">
// // //             Back to Dashboard
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!trip) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="text-6xl mb-4">🤔</div>
// // //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trip not found</h2>
// // //           <Link to="/dashboard" className="btn-primary">
// // //             Back to Dashboard
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const sections = parseAIResponse(trip.aiResponse);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
// // //       {/* Header */}
// // //       <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
// // //         <div className="max-w-7xl mx-auto px-4 py-4">
// // //           <div className="flex justify-between items-center">
// // //             <div className="flex items-center gap-4">
// // //               <Link
// // //                 to="/dashboard"
// // //                 className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
// // //               >
// // //                 <ArrowLeft className="w-5 h-5" />
// // //                 Back to Dashboard
// // //               </Link>
// // //             </div>
            
// // //             <div className="flex items-center gap-4">
// // //               <ThemeToggle />
// // //               <button
// // //                 onClick={handleLogout}
// // //                 className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
// // //               >
// // //                 <LogOut className="w-4 h-4" />
// // //                 Logout
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="max-w-5xl mx-auto px-4 py-8">
// // //         {/* Trip Header */}
// // //         <div className="card p-8 mb-8">
// // //           <div className="text-center">
// // //             <div className="text-6xl mb-4">✈️</div>
// // //             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
// // //               Your Trip to {trip.destination}
// // //             </h1>
            
// // //             <div className="flex justify-center gap-8 text-lg">
// // //               <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
// // //                 <Calendar className="w-5 h-5 text-indigo-600" />
// // //                 <span>{trip.days} days</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
// // //                 <DollarSign className="w-5 h-5 text-green-600" />
// // //                 <span className="capitalize">{trip.budget} budget</span>
// // //               </div>
// // //               <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
// // //                 <Sparkles className="w-5 h-5 text-purple-600" />
// // //                 <span>AI Generated</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* AI Generated Content - Interactive Accordions */}
// // //         <div className="space-y-4">
// // //           {sections.map((section, index) => (
// // //             <div key={section.key || index} className="card overflow-hidden">
// // //               {/* Accordion Header */}
// // //               <button
// // //                 onClick={() => toggleSection(section.key || index)}
// // //                 className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// // //               >
// // //                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
// // //                   {section.title}
// // //                 </h3>
// // //                 {expandedSections[section.key || index] ? (
// // //                   <ChevronUp className="w-6 h-6 text-gray-500 dark:text-gray-400" />
// // //                 ) : (
// // //                   <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
// // //                 )}
// // //               </button>

// // //               {/* Accordion Content */}
// // //               {expandedSections[section.key || index] && (
// // //                 <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
// // //                   <div className="pt-4 space-y-3">
// // //                     {section.content.map((item, itemIndex) => (
// // //                       <div key={itemIndex} className="text-gray-700 dark:text-gray-300">
// // //                         {/* Check if it's an image description */}
// // //                         {item.toLowerCase().includes('photo') ||
// // //                          item.toLowerCase().includes('image') ||
// // //                          item.toLowerCase().includes('beautiful') ? (
// // //                           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-3">
// // //                             <div className="flex items-start gap-3">
// // //                               <div className="text-2xl">📸</div>
// // //                               <div>
// // //                                 <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">
// // //                                   Photo Opportunity
// // //                                 </div>
// // //                                 <div className="text-blue-700 dark:text-blue-300 text-sm">
// // //                                   {item}
// // //                                 </div>
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                         ) : (
// // //                           <div className="flex items-start gap-3">
// // //                             <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
// // //                             <div dangerouslySetInnerHTML={{
// // //                               __html: item
// // //                                 .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
// // //                                 .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
// // //                             }} />
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Action Buttons */}
// // //         <div className="mt-12 text-center space-y-4">
// // //           <div className="text-lg text-gray-600 dark:text-gray-400 mb-6">
// // //             ✨ Your personalized trip plan is ready! Have an amazing journey! ✨
// // //           </div>
          
// // //           <div className="flex gap-4 justify-center">
// // //             <Link to="/dashboard" className="btn-primary">
// // //               Plan Another Trip
// // //             </Link>
// // //             <button
// // //               onClick={() => window.print()}
// // //               className="btn-secondary"
// // //             >
// // //               Print Itinerary
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // //export default TripResults;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TripResults = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('🔒 No token, redirecting to login');
      navigate('/login');
      return;
    }

    console.log('📖 Loading trip details for ID:', tripId);
    loadTripDetails();
  }, [tripId, navigate]);

  const loadTripDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('🔗 Fetching trip from API...');
      
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Trip details response status:', response.status);

      const data = await response.json();
      console.log('📦 Trip details data:', data);

      if (data.success && data.data.trip) {
        setTrip(data.data.trip);
        console.log('✅ Trip loaded successfully');
      } else {
        setError(data.message || 'Trip not found');
        console.error('❌ Failed to load trip:', data.message);
      }

    } catch (error) {
      console.error('❌ Error loading trip:', error);
      setError('Failed to load trip details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-400">
            Loading your amazing trip...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            No trip found
          </h2>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-indigo-700 text-lg font-medium"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>

        {/* Trip Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✈️</div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Your Trip to {trip.destination}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {trip.days} days • {trip.budget} budget • AI Generated ✨
          </p>
        </div>

        {/* AI Generated Content */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <span>🤖</span> Your Personalized Itinerary
          </h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 leading-relaxed text-base">
              {trip.aiResponse}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            ✨ Your personalized trip plan is ready! Have an amazing journey! ✨
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard" className="btn-primary">
              Plan Another Trip
            </Link>
            <button
              onClick={() => window.print()}
              className="btn-secondary"
            >
              Print Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;

// // src/pages/TripResults.jsx




// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';

// // const TripResults = () => {
// //   const { tripId } = useParams();
// //   const navigate = useNavigate();
// //   const [trip, setTrip] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       navigate('/login');
// //       return;
// //     }
// //     fetch(`http://localhost:5000/api/trips/${tripId}`, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     })
// //       .then(res => res.json())
// //       .then(json => {
// //         if (json.success) setTrip(json.data.trip);
// //       })
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, [tripId, navigate]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
// //         <div className="text-xl text-gray-700 dark:text-gray-300">Loading your trip…</div>
// //       </div>
// //     );
// //   }
// //   if (!trip) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
// //         <div className="text-6xl mb-4">😞</div>
// //         <h2 className="text-2xl font-bold mb-2">Trip not found</h2>
// //         <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-6">
// //           <Link to="/dashboard" className="text-indigo-600 hover:underline">← Back</Link>
// //           <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
// //                   className="text-red-600 hover:text-red-800">Logout</button>
// //         </div>

// //         {/* Trip Title */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
// //             Your Trip to {trip.destination}
// //           </h1>
// //           <p className="mt-2 text-gray-600 dark:text-gray-400">
// //             {trip.days} days • {trip.budget} budget • AI Generated ✨
// //           </p>
// //         </div>

// //         {/* Images Gallery */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
// //           {trip.aiResponse.places.slice(0, 6).map((p, i) => (
// //             <div key={i} className="overflow-hidden rounded-lg shadow-lg">
// //               <img
// //                 src={`https://source.unsplash.com/400x300/?${encodeURIComponent(p.imagePrompt)}`}
// //                 alt={p.name}
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="p-4 bg-white dark:bg-gray-800">
// //                 <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{p.name}</h3>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Detailed Place Cards */}
// //         <div className="space-y-6">
// //           {trip.aiResponse.places.map((p, i) => (
// //             <div key={i} className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
// //               <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{p.name}</h2>
// //               <img
// //                 src={`https://source.unsplash.com/800x400/?${encodeURIComponent(p.imagePrompt)}`}
// //                 alt={p.name}
// //                 className="w-full h-64 object-cover rounded-lg mb-4"
// //               />
// //               <p className="text-gray-700 dark:text-gray-300 mb-3">{p.description}</p>
// //               <p className="italic text-sm text-gray-500 dark:text-gray-400">
// //                 Unique feature: {p.uniqueFeature}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Actions */}
// //         <div className="mt-8 flex justify-center gap-4">
// //           <Link to="/dashboard" className="btn-secondary">Plan Another Trip</Link>
// //           <button onClick={() => window.print()} className="btn-primary">Print Itinerary</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TripResults;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';

// const TripResults = () => {
//   const { tripId } = useParams();
//   const navigate = useNavigate();
//   const [trip, setTrip] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }
//     fetch(`http://localhost:5000/api/trips/${tripId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json.success && json.data) setTrip(json.data);
//         else setError('Trip not found');
//       })
//       .catch(() => setError('Failed to load trip'))
//       .finally(() => setLoading(false));
//   }, [tripId, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-xl text-gray-700 dark:text-gray-300">Loading your trip…</div>
//       </div>
//     );
//   }
//   if (error || !trip) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-6xl mb-4">😞</div>
//         <h2 className="text-2xl font-bold mb-2">{error || 'Trip not found'}</h2>
//         <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
//       </div>
//     );
//   }

//   // Defensive: check for itinerary
//   const itinerary = trip.itinerary;
//   if (!itinerary) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-6xl mb-4">🤔</div>
//         <h2 className="text-2xl font-bold mb-2">No itinerary found for this trip.</h2>
//         <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <Link to="/dashboard" className="text-indigo-600 hover:underline">← Back</Link>
//           <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
//                   className="text-red-600 hover:text-red-800">Logout</button>
//         </div>

//         {/* Trip Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//             Your Trip to {itinerary.destination}
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             {itinerary.duration} days • Budget: {itinerary.totalBudget || trip.budget} • AI Generated ✨
//           </p>
//         </div>

//         {/* Daily Itinerary */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Itinerary</h2>
//           {Array.isArray(itinerary.days) && itinerary.days.length > 0 ? (
//             itinerary.days.map((day, idx) => (
//               <div key={idx} className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Day {day.day}</h3>
//                 <ul className="list-disc ml-6 mb-2">
//                   {Array.isArray(day.activities) && day.activities.map((act, i) => (
//                     <li key={i}>{act}</li>
//                   ))}
//                 </ul>
//                 {day.restaurants && <div><b>Restaurants:</b> {day.restaurants.join(', ')}</div>}
//                 {day.transportation && <div><b>Transportation:</b> {day.transportation}</div>}
//                 {day.budget && <div><b>Budget:</b> {day.budget}</div>}
//               </div>
//             ))
//           ) : (
//             <div>No daily itinerary available.</div>
//           )}
//         </div>

//         {/* Tips */}
//         {Array.isArray(itinerary.tips) && itinerary.tips.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Tips</h2>
//             <ul className="list-disc ml-6">
//               {itinerary.tips.map((tip, i) => <li key={i}>{tip}</li>)}
//             </ul>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="mt-8 flex justify-center gap-4">
//           <Link to="/dashboard" className="btn-secondary">Plan Another Trip</Link>
//           <button onClick={() => window.print()} className="btn-primary">Print Itinerary</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TripResults;