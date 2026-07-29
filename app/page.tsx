'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const learningTools = [
    {
      title: "Speed Drill Game",
      description: "Fast-paced interactive challenges to build calculation speed and academic reflexes.",
      badge: "⚡ Action",
      href: "/drill",
      bgGradient: "from-teal-500 to-indigo-600",
      textColor: "text-slate-950",
      icon: "⚡"
    },
    {
      title: "English Spelling Bee",
      description: "Practice primary curriculum word banks with audio & definitions.",
      badge: "🔤 Vocabulary",
      href: "/spelling",
      bgGradient: "from-amber-500 to-orange-600",
      textColor: "text-slate-950",
      icon: "🔤"
    },
    {
      title: "Select Class",
      description: "Explore customized grade levels and structured study modules.",
      badge: "🎓 Curriculum",
      href: "/classes",
      bgGradient: "from-indigo-600 to-indigo-800",
      textColor: "text-white",
      icon: "📚"
    },
    {
      title: "Practice Times Tables",
      description: "Master multiplication facts with interactive drills and practice sets.",
      badge: "✖️ Numbers",
      href: "/times-table",
      bgGradient: "from-teal-600 to-teal-800",
      textColor: "text-white",
      icon: "✖️"
    },
    {
      title: "Practice Question Bank",
      description: "Access curated assessment questions for rigorous academic review.",
      badge: "📚 Assessment",
      href: "/sat-practice",
      bgGradient: "from-emerald-600 to-emerald-800",
      textColor: "text-white",
      icon: "📖"
    },
    {
      title: "Interactive Whiteboard",
      description: "Sketch concepts, draw diagrams, and solve problems visually in real time.",
      badge: "✏️ Creative",
      href: "/whiteboard",
      bgGradient: "from-sky-600 to-sky-800",
      textColor: "text-white",
      icon: "✏️"
    }
  ];

  // Auto-advance carousel banner every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % learningTools.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [learningTools.length]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What age groups do you support?",
      a: "We specialize in primary school students (grades 1 through 6), helping them build comprehensive study habits, academic confidence, and core foundational skills across all school subjects."
    },
    {
      q: "Are tutoring sessions in-person or online?",
      a: "We offer both flexible options depending on your preference and location."
    }
  ];

  // WhatsApp link generator for SAT Prep booking
  const satPhoneNumber = "358449564467";
  const satMessage = "Hi Frankinstant-Edu, I am interested in joining the Special Group SAT Maths Preparatory Class. Please send me the details and schedule.";
  const satWhatsappUrl = `https://wa.me/${satPhoneNumber}?text=${encodeURIComponent(satMessage)}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-6 pb-20 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-2xl shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              🎓
            </div>
            <span className="font-black text-white tracking-tight text-sm sm:text-base">
              Frankinstant<span className="text-teal-400">Edu</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Register Navigation Link */}
            <Link
              href="/register"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-1.5"
            >
              <span>📝</span> Register Form
            </Link>

            {/* Menu Dropdown */}
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border-2 border-slate-700 hover:border-indigo-500 text-slate-200 font-bold rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                <span>👤</span>
                <span>Menu</span>
                <span>☰</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <a href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">Profile</a>
                  <Link href="/register" className="block px-4 py-2 text-sm text-indigo-300 font-bold hover:bg-indigo-600/30 hover:text-white transition">📝 Register Form</Link>
                  <div className="my-1 border-t border-slate-800"></div>
                  <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Ready to Learn</div>
                  <Link href="/drill" className="block px-4 py-2 text-sm text-teal-400 font-bold hover:bg-teal-600/30 hover:text-white transition">⚡ Speed Drill Game</Link>
                  <Link href="/spelling" className="block px-4 py-2 text-sm text-amber-400 font-bold hover:bg-amber-600/30 hover:text-white transition">🔤 English Spelling Bee</Link>
                  <a href="/classes" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">🎓 Select Class</a>
                  <a href="/times-table" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">✖️ Practice Times Tables</a>
                  <Link href="/sat-practice" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">📚 Practice Question Bank</Link>
                  <Link href="/whiteboard" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">✏️ Interactive Whiteboard</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-52 mb-6 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 relative bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" 
              alt="Books and Apple" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Frankinstant-Edu</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Comprehensive primary school tutoring, homework support, and interactive learning tools.
          </p>
        </div>

        {/* SAT Maths Preparatory Class Promo Section (Moved to First Glance) */}
        <section className="w-full mb-10 p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl shadow-2xl relative overflow-hidden ring-2 ring-indigo-500/20">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center md:text-left">
              <span className="inline-block w-fit mx-auto md:mx-0 text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full mb-3">
                🔥 Featured Program • Enrollment Open
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Special Group SAT Maths Prep Class
              </h2>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Master core mathematical concepts, tackle high-difficulty problem-solving, and boost your exam scores with our intensive small-group preparatory sessions.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <div className="text-center md:text-right">
                <span className="text-[11px] text-slate-400 block">Limited spots per group</span>
                <span className="text-xs font-bold text-emerald-400">Secure Your Spot</span>
              </div>

              <a
                href={satWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-900/20 transition text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>💬 Book via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Rotating Flash / Swipe Banner Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white">Explore Our Learning Tools</h2>
          </div>
          
          {/* Swipe Card Container */}
          <div className="relative overflow-hidden min-h-[190px] flex items-center justify-center">
            {learningTools.map((tool, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${tool.bgGradient} shadow-2xl border border-white/10 ${
                    isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                      {tool.badge}
                    </span>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="text-left mb-4">
                    <h3 className={`text-xl sm:text-2xl font-black ${tool.textColor} mb-1`}>
                      {tool.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium ${tool.textColor} opacity-90`}>
                      {tool.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <Link
                      href={tool.href}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition shadow-lg ${
                        tool.textColor === 'text-slate-950' ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-white text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      Launch Tool →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide Indicators / Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {learningTools.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index ? 'w-8 bg-teal-400' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Meet Your Tutor Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="w-32 h-32 mx-auto md:mx-0 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-teal-500/30 border border-indigo-500/40 flex items-center justify-center text-5xl shadow-xl mb-4">
                👨‍🏫
              </div>
              <h3 className="text-xl font-black text-white">Frank</h3>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mt-1">Lead Educator & Founder</p>
            </div>
            <div className="md:col-span-2 space-y-4 text-slate-300 text-sm sm:text-base font-medium">
              <h4 className="text-lg font-bold text-white">Dedicated to Building Academic Confidence</h4>
              <p>
                Hello! I am Frank, the founder and lead tutor behind Frankinstant-Edu. I combine a strong professional background in management and operations with a deep passion for primary school education, skill building, and academic success.
              </p>
              <p>
                My approach focuses on making learning structured, engaging, and stress-free across all core subjects. Whether your child needs help with school assignments, literacy, language practice, problem-solving, or general study habits, I am here to help them succeed.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">Primary Curriculum Support</span>
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">1-on-1 Coaching</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-700/80 rounded-2xl p-4 transition bg-slate-800/40">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-bold text-slate-200 text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-teal-400 font-black text-lg">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-700/80 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
          <div className="text-slate-300 text-sm space-y-2 font-medium mb-6">
            <p>📞 Phone: +358 449564467</p>
            <p>✉️ Email: frankinstantedu@gmail.com</p>
          </div>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg"
          >
            📝 Fill Out Registration Form
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-slate-500 text-xs font-medium">
        <p>© {new Date().getFullYear()} Frankinstant-Edu. All rights reserved.</p>
        <p className="mt-1">Empowering primary school success with professional tutoring and interactive tools.</p>
      </footer>

    </main>
  );
}