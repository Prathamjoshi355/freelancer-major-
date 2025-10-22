'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: "⚡", text: "No upfront fees", color: "emerald" },
    { icon: "🚀", text: "Trusted by startups", color: "blue" },
    { icon: "🔒", text: "Secure payments", color: "purple" }
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-20 md:pt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className={`flex flex-col gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-5xl leading-tight">
            Hire top{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                freelancers
              </span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200 -z-0 animate-pulse"></span>
            </span>
            {' '}or find your next great client
          </h1>
          
          <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            Post a job in minutes and connect with vetted talent. Or create your profile and start winning projects
            today.
          </p>
          
          <div className={`flex flex-wrap items-center gap-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">Sign up free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          
      
            <a href="/register/client" className="text-sm font-medium text-blue-600 hover:text-blue-700 relative group">
              Find freelancers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
           
            <a href="/register/freelancer" className="text-sm font-medium text-blue-600 hover:text-blue-700 relative group">
              Be a freelancer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <div className={`mt-2 flex flex-wrap items-center gap-3 text-xs transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-500 ${
                    activeFeature === index 
                      ? `bg-${feature.color}-100 text-${feature.color}-700 scale-110 shadow-lg` 
                      : 'bg-slate-100 text-slate-600 scale-100'
                  }`}
                  style={{
                    backgroundColor: activeFeature === index ? 
                      (feature.color === 'emerald' ? '#d1fae5' : feature.color === 'blue' ? '#dbeafe' : '#f3e8ff') : '#f1f5f9',
                    color: activeFeature === index ?
                      (feature.color === 'emerald' ? '#047857' : feature.color === 'blue' ? '#1d4ed8' : '#7c3aed') : '#64748b'
                  }}
                >
                  <span className={`text-base transition-transform duration-300 ${activeFeature === index ? 'scale-125' : 'scale-100'}`}>
                    {feature.icon}
                  </span>
                  <span className="font-medium">{feature.text}</span>
                </div>
                {index < features.length - 1 && <span className="text-slate-400">•</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={`order-first md:order-none transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-25 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
              <img
                src="/collaboration-between-clients-and-freelancers.png"
                alt="Clients collaborating with freelancers"
                className="h-full w-full object-cover relative z-10 mix-blend-multiply"
              />
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg animate-float">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg animate-float animation-delay-2000">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-700">Live projects: 1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}