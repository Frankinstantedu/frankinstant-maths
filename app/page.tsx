'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [parentName, setParentName] = useState('');
  const [childGrade, setChildGrade] = useState('Grade 1');
  const [subject, setSubject] = useState('Primary School Curriculum & Homework Support');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  // Subscription / Feature Lock States
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [selectedLockedTool, setSelectedLockedTool] = useState<{ title: string; href: string } | null>(null);

  // Check saved subscription status on load
  useEffect(() => {
    const savedStatus = localStorage.getItem('frankinstant_subscribed');
    if (savedStatus === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'FRANK2026' with whatever temporary or permanent subscriber password you wish to issue
    if (accessPassword.trim() === 'FRANK2026') {
      setIsSubscribed(true);
      localStorage.setItem('frankinstant_subscribed', 'true');
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setAccessPassword('');
      if (selectedLockedTool) {
        window.location.href = selectedLockedTool.href;
      }
    } else {
      setPasswordError(true);
    }
  };

  const handleToolClick = (e: React.MouseEvent, tool: { title: string; href: string; locked?: boolean }) => {
    if (tool.locked && !isSubscribed) {
      e.preventDefault();
      setSelectedLockedTool(tool);
      setIsPasswordModalOpen(true);
    }
  };

  const learningTools = [
    {
      title: "Speed Drill Game",
      description: "Fast-paced interactive challenges to build calculation speed and academic reflexes.",
      badge: "⚡ Action",
      href: "/drill",
      bgGradient: "from-teal-500 to-indigo-600",
      textColor: "text-slate-950",
      icon: "⚡",
      locked: false // Free preview tool
    },
    {
      title: "English Spelling Bee",
      description: "Practice primary curriculum word banks with audio & definitions.",
      badge: "🔤 Vocabulary",
      href: "/spelling-bee",
      bgGradient: "from-amber-500 to-orange-600",
      textColor: "text-slate-950",
      icon: "🔤",
      locked: true // Subscriber-only tool example
    },
    {
      title: "Select Class",
      description: "Explore customized grade levels and structured study modules.",
      badge: "🎓 Curriculum",
      href: "/classes",
      bgGradient: "from-indigo-600 to-indigo-800",
      textColor: "text-white",
      icon: "📚",
      locked: true
    },
    {
      title: "Practice Times Tables",
      description: "Master multiplication facts with interactive drills and practice sets.",
      badge: "✖️ Numbers",
      href: "/times-table",
      bgGradient: "from-teal-600 to-teal-800",
      textColor: "text-white",
      icon: "✖️",
      locked: false
    },
    {
      title: "Practice Question Bank",
      description: "Access curated assessment questions for rigorous academic review.",
      badge: "📚 Assessment",
      href: "/sat-practice",
      bgGradient: "from-emerald-600 to-emerald-800",
      textColor: "text-white",
      icon: "📖",
      locked: true
    },
    {
      title: "Interactive Whiteboard",
      description: "Sketch concepts, draw diagrams, and solve problems visually in real time.",
      badge: "✏️ Creative",
      href: "/whiteboard",
      bgGradient: "from-sky-600 to-sky-800",
      textColor: "text-white",
      icon: "✏️",
      locked: true
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

  // Handle WhatsApp Booking Submission
  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Frank! I would like to book a tutoring session or subscribe.%0A%0A*Parent Name:* ${parentName}%0A*Child Grade:* ${childGrade}%0A*Subject Focus:* ${subject}%0A*Preferred Date:* ${preferredDate || 'Flexible'}%0A*Notes:* ${notes || 'None'}`;
    window.open(`https://wa.me/358449564467?text=${text}`, '_blank');
    setIsBookingOpen(false);
  };

  // Handle Email Booking Submission
  const handleEmailBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectLine = encodeURIComponent(`Subscription / Tutoring Inquiry: ${parentName} - ${childGrade}`);
    const body = encodeURIComponent(`Hello Frank,\n\nI would like to inquire about subscribing and booking tutoring services.\n\nParent Name: ${parentName}\nChild Grade: ${childGrade}\nSubject Focus: ${subject}\nPreferred Date: ${preferredDate || 'Flexible'}\nNotes: ${notes || 'None'}`);
    window.location.href = `mailto:frankinstantedu@gmail.com?subject=${subjectLine}&body=${body}`;
    setIsBookingOpen(false);
  };

  const faqs = [
    {
      q: "How do I get the password to unlock premium learning tools?",
      a: "Once you book a tutoring session or set up a monthly subscription with us, we will instantly provide you with your exclusive access password."
    },
    {
      q: "What age groups do you support?",
      a: "We specialize in primary school students (grades 1 through 6), helping them build comprehensive study habits, academic confidence, and core foundational skills across all school subjects."
    },
    {
      q: "Are tutoring sessions in-person or online?",
      a: "We offer both flexible options depending on your preference and location around Joensuu, Finland."
    }
  ];

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
            {/* Subscription Status Pill */}
            {!isSubscribed ? (
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs transition hover:bg-amber-500/30 cursor-pointer"
              >
                <span>🔒</span> Enter Access Password
              </button>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs">
                <span>🔓</span> Subscriber Unlocked
              </span>
            )}

            {/* Quick Book CTA Button in Header */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg cursor-pointer"
            >
              <span>📅</span> Book / Subscribe
            </button>

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
                  {!isSubscribed ? (
                    <button 
                      onClick={() => { setMenuOpen(false); setIsPasswordModalOpen(true); }}
                      className="w-full text-left px-4 py-2 text-sm text-amber-400 font-bold hover:bg-amber-600/30 hover:text-white transition cursor-pointer"
                    >
                      🔒 Enter Subscriber Password
                    </button>
                  ) : (
                    <div className="px-4 py-2 text-xs font-bold text-emerald-400">🔓 Unlocked Member</div>
                  )}
                  <div className="my-1 border-t border-slate-800"></div>
                  <div className="px-4 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Ready to Learn</div>
                  <Link href="/drill" className="block px-4 py-2 text-sm text-teal-400 font-bold hover:bg-teal-600/30 hover:text-white transition">⚡ Speed Drill Game</Link>
                  <Link href="/spelling-bee" className="block px-4 py-2 text-sm text-amber-400 font-bold hover:bg-amber-600/30 hover:text-white transition">🔤 English Spelling Bee { !isSubscribed && '🔒' }</Link>
                  <a href="/classes" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">🎓 Select Class { !isSubscribed && '🔒' }</a>
                  <a href="/times-table" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">✖️ Practice Times Tables</a>
                  <Link href="/sat-practice" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">📚 Practice Question Bank { !isSubscribed && '🔒' }</Link>
                  <Link href="/whiteboard" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">✏️ Interactive Whiteboard { !isSubscribed && '🔒' }</Link>
                  <div className="my-1 border-t border-slate-800"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/40 transition cursor-pointer">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-full h-64 mb-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 relative bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" 
              alt="Books and Apple" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Frankinstant-Edu</span>
          </h1>
          <p className="text-slate-300 text-base max-w-lg mx-auto font-medium mb-6">
            Comprehensive primary school tutoring, homework support, and interactive learning tools based in Joensuu, Finland.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-slate-950 font-black rounded-2xl text-base transition shadow-xl shadow-teal-500/20 cursor-pointer"
            >
              📅 Book / Subscribe Now
            </button>
            {!isSubscribed && (
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold rounded-2xl text-base transition cursor-pointer flex items-center gap-2"
              >
                <span>🔒</span> Enter Access Password
              </button>
            )}
          </div>
        </div>

        {/* Rotating Flash / Swipe Banner Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white">Explore Our Learning Tools</h2>
            {!isSubscribed && (
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                🔒 Some tools require subscription
              </span>
            )}
          </div>
          
          {/* Swipe Card Container */}
          <div className="relative overflow-hidden min-h-[190px] flex items-center justify-center">
            {learningTools.map((tool, index) => {
              const isActive = index === currentSlide;
              const isLocked = tool.locked && !isSubscribed;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${tool.bgGradient} shadow-2xl border border-white/10 ${
                    isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-full pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      {isLocked && <span>🔒</span>}
                      {tool.badge}
                    </span>
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="text-left mb-4">
                    <h3 className={`text-xl sm:text-2xl font-black ${tool.textColor} mb-1 flex items-center gap-2`}>
                      {tool.title} {isLocked && <span className="text-sm bg-black/40 px-2 py-0.5 rounded text-amber-300">Subscriber Only</span>}
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium ${tool.textColor} opacity-90`}>
                      {tool.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <Link
                      href={tool.href}
                      onClick={(e) => handleToolClick(e, tool)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition shadow-lg ${
                        tool.textColor === 'text-slate-950' ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-white text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      {isLocked ? 'Unlock with Password →' : 'Launch Tool →'}
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
                Hello! I am Frank, the founder and lead tutor behind Frankinstant-Edu. Based right here in Joensuu, Finland, I combine a strong professional background in management and operations with a deep passion for primary school education, skill building, and academic success.
              </p>
              <p>
                My approach focuses on making learning structured, engaging, and stress-free across all core subjects. Whether your child needs help with school assignments, literacy, language practice, problem-solving, or general study habits, I am here to help them succeed.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">Primary Curriculum Support</span>
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">1-on-1 Coaching</span>
                <span className="px-3 py-1 bg-teal-950/80 text-teal-300 font-bold text-xs rounded-xl border border-teal-800/60">Joensuu, Finland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutoring Services Snapshot */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">What We Offer</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">📚</span>
              <h4 className="font-bold text-white mb-1">General Homework Support</h4>
              <p className="text-xs text-slate-400">Guidance across all primary school subjects and assignments.</p>
            </div>
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">🎯</span>
              <h4 className="font-bold text-white mb-1">1-on-1 Coaching</h4>
              <p className="text-xs text-slate-400">Personalized attention tailored to your child's pace and style.</p>
            </div>
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">🌟</span>
              <h4 className="font-bold text-white mb-1">Study Habits & Skills</h4>
              <p className="text-xs text-slate-400">Building lifelong organization, focus, and academic confidence.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-teal-950/60 border border-indigo-500/30 rounded-3xl p-8 mb-12 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6 text-center">What Parents Say</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg border border-slate-700/80 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic mb-4">
                "My daughter's overall school performance and study confidence improved tremendously after just a few weeks of personalized tutoring. Highly recommended!"
              </p>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">— Parent in Joensuu</span>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg border border-slate-700/80 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic mb-4">
                "The interactive practice tools combined with expert general guidance made learning fun and structured for my son. Excellent service."
              </p>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">— Primary School Parent</span>
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

        {/* Info & Contact Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl border border-indigo-700/60 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                To provide accessible, high-quality educational resources and guidance that empower every child to reach their full potential.
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-800/80">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block mb-1">Based in Joensuu</span>
              <p className="text-xs text-indigo-200">Private & group tutoring tailored for primary school success.</p>
            </div>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact & Subscriptions</h3>
              <div className="text-slate-300 text-sm space-y-3 font-medium mb-6">
                <p>📞 Phone: +358 449564467</p>
                <p>✉️ Email: frankinstantedu@gmail.com</p>
                <p>📍 Address: Joensuu, Finland</p>
              </div>
            </div>

            {/* Instant Action Buttons for Parents */}
            <div className="space-y-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-bold text-center rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                📅 Subscribe & Schedule Consultation
              </button>
              <a 
                href="https://wa.me/358449564467?text=Hello,%20I%20would%20like%20to%20subscribe%20to%20unlock%20all%20features." 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center rounded-xl text-sm transition shadow-lg shadow-emerald-600/30"
              >
                💬 Chat on WhatsApp to Subscribe
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Password Entry Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => { setIsPasswordModalOpen(false); setSelectedLockedTool(null); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-xl cursor-pointer"
            >
              ✕
            </button>
            <div className="mb-6 text-center">
              <span className="text-3xl mb-2 block">🔒</span>
              <h3 className="text-xl font-black text-white">Enter Subscriber Password</h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedLockedTool 
                  ? `Enter your password to unlock "${selectedLockedTool.title}".`
                  : "Enter your subscriber password to unlock all premium learning tools."}
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  required
                  placeholder="Enter subscriber password"
                  value={accessPassword}
                  onChange={(e) => setAccessPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 text-center tracking-widest font-bold"
                />
                {passwordError && (
                  <p className="text-xs text-rose-400 font-bold mt-2 text-center">Incorrect password. Please contact Frank to subscribe!</p>
                )}
              </div>

              <div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-center rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Unlock Features
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Don't have a password yet?{' '}
                  <button 
                    type="button" 
                    onClick={() => { setIsPasswordModalOpen(false); setIsBookingOpen(true); }}
                    className="text-teal-400 font-bold hover:underline cursor-pointer"
                  >
                    Subscribe with Frank
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking / Subscription Popup Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white font-bold text-xl cursor-pointer"
            >
              ✕
            </button>
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white">Subscribe & Book</h3>
              <p className="text-xs text-slate-400 mt-1">Fill out the details below to subscribe and receive your access password or schedule a consultation!</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Parent's Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Maria Virtanen"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Child's Grade</label>
                  <select 
                    value={childGrade}
                    onChange={(e) => setChildGrade(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Subject Focus</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option>Primary School Curriculum & Homework</option>
                    <option>General Academic Support</option>
                    <option>English Spelling & Reading</option>
                    <option>Numbers & Arithmetic</option>
                    <option>General 1-on-1 Coaching</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Preferred Date / Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. Next Tuesday afternoon"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Additional Notes (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="Any specific topics, subjects, or assignments your child needs help with..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center rounded-xl text-sm transition shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>💬</span> Send via WhatsApp
                </button>
                <button 
                  type="button"
                  onClick={handleEmailBooking}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-center rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>✉️</span> Send via Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}