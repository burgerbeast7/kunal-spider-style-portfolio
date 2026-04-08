import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reuse our hero assets for the dual-identity mask effect prototype
import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const maskRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 1. ScrollTrigger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline bound to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // triggers when the top of the section hits 75% of the viewport height
          toggleActions: "play none none reverse" // play forwards on scroll down, reverse on scroll out
        }
      });

      // Select all text lines that have the 'stagger-reveal' class
      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
      
      // Select the image container
      const imgElement = imageContainerRef.current;

      tl.fromTo(imgElement, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(textElements, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8" // start before image is fully in
      );
      
    }, sectionRef);

    return () => ctx.revert(); // clean up ScrollTrigger
  }, []);

  // 2. Interactive Spotlight Mask
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    // Get mouse position relative to the image container
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Use GSAP to smoothly lerp the mask center
    gsap.to(maskRef.current, {
      '--x': `${x}%`,
      '--y': `${y}%`,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    // Return to default center position smoothly
    gsap.to(maskRef.current, {
      '--x': '50%',
      '--y': '50%',
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  return (
    <section 
    id='about'
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Interactive Portrait */}
        <div 
          ref={imageContainerRef}
          className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden cursor-crosshair group shadow-2xl border border-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: 'translateZ(0)' }} // Hardware acceleration
        >
          {/* Base Layer: Spiderman (Always Visible) */}
          <img 
            src={imgSpiderman} 
            alt="Hero Persona" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-80 mix-blend-luminosity brightness-75 transition-all duration-700 group-hover:scale-105"
          />

          {/* Masked Overlay: Actual Human (Revealed on Hover) */}
          <div 
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{
              '--x': '50%',
              '--y': '50%',
              // The circular logic simulates a spotlight reveal
              clipPath: 'circle(20% at var(--x) var(--y))',
              transition: 'clip-path 0.2s cubic-bezier(0.2, 0, 0.2, 1)'
            }}
          >
            <img 
              src={imgMan} 
              alt="The Real Kunal" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out"
            />
            
            {/* Inner spotlight glow matched inside the mask */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
          </div>

          {/* Interaction Hint Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-24 h-24 rounded-full border border-white/20 scale-150 animate-ping absolute" />
          </div>
        </div>

        {/* Right Column: Story & Details */}
        <div ref={textContainerRef} className="flex flex-col justify-center space-y-10">
          
          <div className="overflow-hidden">
            <h2 className="stagger-reveal text-5xl md:text-6xl font-bold tracking-tighter text-white font-sans leading-tight">
              Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 font-serif italic pr-4">Architect</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              Results-driven Computer Science undergraduate (BTech, HPTU '27) with hands-on 
              experience building scalable full-stack applications and REST APIs. Skilled in Python, 
              Django, React.js, and PostgreSQL with proven ability to deliver production-ready solutions 
              in fast-paced environments. Strong focus on backend systems, secure authentication, 
              cloud deployment, and data structures & algorithms.
            </p>
          </div>

          {/* Education Block */}
          <div className="overflow-hidden">
            <div className="stagger-reveal border-l-2 border-red-500/50 pl-6 py-2 mb-8">
              <h3 className="text-white text-xl font-bold font-sans tracking-tight">Bachelor of Technology — Computer Science & Engineering</h3>
              <p className="text-gray-400 text-sm font-mono tracking-wider">[ HPTU, India // Aug 2023 – Sep 2027 ]</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["DSA", "Operating Systems", "DBMS", "Cloud Computing", "Computer Networks", "OOP", "Discrete Math"].map(course => (
                  <span key={course} className="text-[9px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-500">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* New Certifications Badge Section */}
          <div className="overflow-hidden pt-4">
            <p className="stagger-reveal text-red-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Verification_Records // Certifications</p>
            <div className="grid grid-cols-2 gap-4 stagger-reveal">
              {[
                { name: "AWS Cloud Essentials", issuer: "AWS" },
                { name: "Cloud Security for Executives", issuer: "LinkedIn" },
                { name: "Play Store Listing", issuer: "Google" },
                { name: "Instagram Clone", issuer: "Cuvette" }
              ].map((cert, i) => (
                <div key={i} className="group bg-white/5 border border-white/5 p-3 rounded-lg hover:border-red-500/30 transition-all duration-300">
                  <p className="text-[10px] text-gray-500 font-mono mb-1">{cert.issuer}</p>
                  <p className="text-xs text-white font-bold tracking-tight">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="overflow-hidden mt-6">
            <blockquote className="stagger-reveal border-l-2 border-white/20 pl-6 py-2">
              <p className="text-xl md:text-2xl text-gray-300 font-serif italic">
                “Engineering the future, <br /> one commit at a time.”
              </p>
            </blockquote>
          </div>
          
        </div>

      </div>
    </section>
  );
}
