// src/OrbitHome.jsx - With Welcome Screen + Homepage
import React, { useState, useEffect } from 'react'

function OrbitHome() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])
  const [messageIndex, setMessageIndex] = useState(0)

  const messages = [
    "Click anywhere to start",
    "Your orbit begins",
    "Launch into your future",
    "Ready for takeoff?"
  ]

  // Rotating messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Create particles
  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.6 + 0.3,
      })
    }
    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleStart = () => {
    setFadeOut(true)
    setTimeout(() => {
      setShowWelcome(false)
    }, 800)
  }

  const features = [
    { icon: "🔍", title: "GitHub Analysis", desc: "Deep analysis of your repositories, commits, and contribution patterns" },
    { icon: "📄", title: "Smart Resume Parser", desc: "AI-powered skill extraction from your resume" },
    { icon: "🎯", title: "Career Matcher", desc: "Personalized job recommendations based on your skills" },
    { icon: "📊", title: "Market Insights", desc: "Real-time salary data and skill demand trends" },
    { icon: "📚", title: "Learning Roadmaps", desc: "Custom courses and certification recommendations" },
    { icon: "🎤", title: "Interview Coach", desc: "AI-generated practice questions with answers" },
  ]

  // WELCOME SCREEN
  if (showWelcome) {
    return (
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#050505] flex items-center justify-center z-50 transition-opacity duration-800 cursor-pointer ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleStart}
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float-slow" style={{ top: '-20%', left: '-20%' }}></div>
          <div className="absolute w-[700px] h-[700px] bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float-medium" style={{ bottom: '-20%', right: '-20%' }}></div>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="w-28 h-28 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full border border-pink-500/30 animate-spin-reverse"></div>
            <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-sm border border-white/10">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>O</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Welcome to
          </h1>
          
          <div className="overflow-hidden mb-2">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
              ORBIT
            </h1>
          </div>
          
          <p className="text-purple-300 text-sm md:text-base font-light tracking-wide mb-6 italic">
            𝓟𝓾𝓽 𝔂𝓸𝓾𝓻 𝓒𝓪𝓻𝓮𝓮𝓻 𝓲𝓷 𝓹𝓮𝓻𝓯𝓮𝓬𝓽 𝓞𝓻𝓫𝓲𝓽
          </p>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-expand-width mb-8"></div>
          
          <p className="text-gray-300 text-base font-light tracking-wide">
            {messages[messageIndex]}
          </p>
        </div>
      </div>
    )
  }

  // HOMEPAGE (after welcome screen)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      
      {/* Starfield Background */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,0.5)`,
            }}
          />
        ))}
      </div>

      {/* ORBIT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-full h-full max-w-[900px] max-h-[900px] mx-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl opacity-40 animate-pulse-glow"></div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full filter blur-xl opacity-30"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/40" style={{ width: '250px', height: '250px' }}>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-500/30" style={{ width: '380px', height: '380px' }}>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-pink-400 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/25" style={{ width: '520px', height: '520px' }}>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-purple-500/20" style={{ width: '660px', height: '660px' }}></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/15" style={{ width: '800px', height: '800px' }}>
            <div className="absolute top-1/2 -left-1 w-4 h-4 bg-pink-400 rounded-full shadow-lg"></div>
          </div>
          
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 shadow-lg"
              style={{
                left: `calc(50% + ${Math.cos(i * 30 * Math.PI / 180) * 280}px)`,
                top: `calc(50% + ${Math.sin(i * 30 * Math.PI / 180) * 280}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `orbit-particle ${8 + i}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_40%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_#ffffff08_1px),_linear-gradient(90deg,_#ffffff08_1px,_transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
      </div>

      {/* Mouse Glow Effect */}
      <div 
        className="fixed w-48 h-48 rounded-full bg-purple-500/15 blur-2xl pointer-events-none transition-all duration-100"
        style={{
          transform: `translate(${mousePosition.x - 96}px, ${mousePosition.y - 96}px)`,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center shadow-lg border border-white/15">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>O</span>
              </div>
              <div>
                <span className="text-white font-semibold text-lg tracking-wide">ORBIT</span>
                <p className="text-gray-400 text-[10px] -mt-1">Put your Career in perfect Orbit</p>
              </div>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="text-gray-300 hover:text-white transition text-sm font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </a>
              <a href="#features" className="text-gray-300 hover:text-white transition text-sm font-medium relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </a>
            </div>
            <div>
              <a href="/signin">
                <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-purple-500/30 transition-all hover:scale-105">
                  Sign In
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-spin-slow"></div>
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/15 mx-auto">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>O</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Your AI-Powered
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Orbit
            </span>
          </h1>
          
          <p className="text-purple-300 text-sm md:text-base font-light tracking-wide mb-6 italic">
            𝓟𝓾𝓽 𝔂𝓸𝓾𝓻 𝓒𝓪𝓻𝓮𝓮𝓻 𝓲𝓷 𝓹𝓮𝓻𝓯𝓮𝓬𝓽 𝓞𝓻𝓫𝓲𝓽
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Launch your career into the right trajectory with AI-powered insights, 
            personalized recommendations, and intelligent career guidance.
          </p>
          
          <div className="flex justify-center mb-32">
            <a href="/signup">
              <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Launch Your Journey →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-6 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Navigate Your Career
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                With Precision
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to chart your professional trajectory
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:border-purple-500/60 hover:bg-white/12 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Launch Your Career?
            </h2>
            <p className="text-purple-100 mb-8">
              Thousands of professionals already navigating their career trajectory
            </p>
            <a href="/signup">
              <button className="px-10 py-4 bg-white text-purple-600 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Start Your Orbit →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/15 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center border border-white/15">
                <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>O</span>
              </div>
              <span className="text-gray-400 text-sm">© 2025 ORBIT</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes orbit-particle {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-reverse {
          0%, 100% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(40px, -25px) scale(1.1); }
          50% { transform: translate(-25px, 40px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, -20px) scale(1.12); }
          66% { transform: translate(25px, -30px) scale(0.88); }
        }
        @keyframes expand-width {
          from { width: 0; }
          to { width: 5rem; }
        }
        @keyframes scroll {
          0% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(6px); }
          100% { opacity: 0; transform: translateY(12px); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 25s linear infinite; }
        .animate-float-slow { animation: float-slow 25s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 18s ease-in-out infinite; }
        .animate-expand-width { animation: expand-width 0.8s ease-out forwards; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default OrbitHome