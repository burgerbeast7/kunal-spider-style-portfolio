import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInstaHovered, setIsInstaHovered] = useState(false);
  
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const glowRef = useRef(null);

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Load Animation
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate Navbar dropping down
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    
    // Stagger in the links
    if (linksRef.current.length > 0) {
      tl.fromTo(linksRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.6"
      );
    }
  }, []);

  // Mouse Glow Interaction
  const handleMouseMove = (e) => {
    if (!glowRef.current || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(glowRef.current, {
      x,
      y,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  // Mobile Menu Animation Toggle
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 90% 10%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      gsap.fromTo(mobileLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 90% 10%)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'bg-black/40 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        {/* Subtle Background Glow Mask */}
        <div 
          ref={glowRef}
          className="pointer-events-none absolute w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-0 md:opacity-100 transition-opacity duration-300"
        />

        <div className="max-w-[100rem] mx-auto px-8 lg:px-12 flex justify-between items-center relative z-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
              <path d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="text-white font-bold tracking-widest uppercase text-sm ml-2 opacity-90 group-hover:opacity-100 transition-opacity">
              Kunal
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href}
                ref={el => linksRef.current[index] = el}
                className="relative text-gray-400 hover:text-white text-xs font-medium tracking-widest uppercase transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          {/* CTA & Social */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group/insta" 
                 onMouseEnter={() => setIsInstaHovered(true)}
                 onMouseLeave={() => setIsInstaHovered(false)}>
              <a href="https://www.instagram.com/kunal.3.6.3.4?igsh=MWZybG9rNnhmN3VmMA==" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              
              {/* Instagram Hover Preview */}
              <div className={`absolute top-full right-0 mt-4 w-48 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-2xl transition-all duration-300 pointer-events-none ${isInstaHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1px]">
                     <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">KC</div>
                  </div>
                  <div className="text-[10px] text-white font-bold">@kunal.3.6.3.4</div>
                </div>
                <div className="text-[9px] text-gray-400 leading-tight">Software Engineer | Full-Stack Developer</div>
                <div className="mt-2 text-[9px] text-red-500 font-bold uppercase tracking-widest">View Profile →</div>
              </div>
            </div>

            <button 
              ref={el => linksRef.current[NAV_LINKS.length] = el}
              className="relative px-6 py-2 rounded-full overflow-hidden group bg-transparent border border-white/10 text-white text-xs font-medium tracking-widest hover:border-red-500/50 transition-colors duration-300"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 h-full w-full bg-red-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        <div className="flex flex-col space-y-6 text-center mt-10 px-6">
          {NAV_LINKS.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href}
              ref={el => mobileLinksRef.current[index] = el}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-light text-gray-400 hover:text-white transition-colors tracking-widest uppercase relative group"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            ref={el => mobileLinksRef.current[NAV_LINKS.length] = el}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 px-8 py-3 rounded-full border border-red-500 text-white tracking-widest hover:bg-red-500 transition-all duration-300 uppercase text-sm font-bold"
          >
            Contact Me
          </button>

          <div className="flex justify-center space-x-6 mt-12 opacity-50">
             <a href="https://www.instagram.com/kunal.3.6.3.4?igsh=MWZybG9rNnhmN3VmMA==" target="_blank" rel="noopener noreferrer" className="text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
             </a>
          </div>
        </div>
      </div>
    </>
  );
}
