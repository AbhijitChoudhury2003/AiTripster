import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Users, Clock, Star, Globe } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const HomePage = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Interactive destination carousel
  const destinations = [
    { name: "Paris, France", emoji: "🇫🇷" },
    { name: "Tokyo, Japan", emoji: "🇯🇵" },
    { name: "Bali, Indonesia", emoji: "🇮🇩" },
    { name: "New York, USA", emoji: "🇺🇸" }
  ];

  // Auto-rotate destinations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Simple Navigation */}
      <nav className="p-6 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:scale-110 transition-transform">
            ✈️ Trip-AI
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              to="/login" 
              className="px-6 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Plan Your Perfect Trip to
            <div className="text-indigo-600 dark:text-indigo-400 h-16 flex items-center justify-center">
              <span className="inline-block animate-pulse">
                {destinations[currentDestination].emoji} {destinations[currentDestination].name}
              </span>
            </div>
          </h1>
          
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Just tell us your destination and preferences. Our AI creates 
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> personalized travel itineraries </span>
            with amazing places, local tips, and perfect timing.
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex gap-6 justify-center mb-16">
            <Link 
              to="/register" 
              className="group relative px-8 py-4 bg-indigo-600 text-white text-xl font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-2xl hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                Start Planning Now
              </span>
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 text-xl font-semibold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              I Have Account
            </Link>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Sparkles, title: "AI-Powered", desc: "Smart recommendations tailored to your interests", color: "indigo" },
              { icon: MapPin, title: "Best Locations", desc: "Discover hidden gems and popular attractions", color: "green" },
              { icon: Clock, title: "Perfect Timing", desc: "Day-by-day plans with optimal schedules", color: "orange" },
              { icon: Users, title: "Personal", desc: "Customized for your budget and style", color: "purple" }
            ].map((feature, index) => (
              <div
                key={index}
                className={`card p-8 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  hoveredCard === index ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <feature.icon 
                  className={`w-12 h-12 mx-auto mb-4 transition-all duration-300 ${
                    feature.color === 'indigo' ? 'text-indigo-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'orange' ? 'text-orange-600' : 'text-purple-600'
                  } ${hoveredCard === index ? 'animate-bounce' : ''}`} 
                />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="text-center py-12 bg-gray-100 dark:bg-gray-800">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">✈️ Trip-AI</div>
        <p className="text-gray-600 dark:text-gray-400">
          Made with ❤️ for College Placement Project | MERN Stack + AI
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
