import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CinematicEntrance({ onStarted }) {
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      gsap.to(audioRef.current, { volume: 0.5, duration: 2 });
    }

    // Fade out overlay
    const tl = gsap.timeline({
      onComplete: () => {
        if (onStarted) onStarted();
      }
    });

    tl.to(textRef.current, { 
      opacity: 0, 
      y: -20, 
      duration: 0.8, 
      ease: "power3.in" 
    })
    .to(overlayRef.current, { 
      opacity: 0, 
      duration: 1.5, 
      ease: "power3.inOut" 
    }, "-=0.2")
    .set(overlayRef.current, { display: 'none' });
  };

  useEffect(() => {
    // Scroll-based mute logic
    const handleScroll = () => {
      if (!audioRef.current || !hasStarted) return;
      
      const threshold = window.innerHeight * 0.5; // Mute when Hero is 50% gone
      const scrollPos = window.scrollY;
      
      if (scrollPos > threshold) {
        gsap.to(audioRef.current, { volume: 0, duration: 1 });
      } else {
        gsap.to(audioRef.current, { volume: 0.5, duration: 1 });
      }
    };

    if (hasStarted) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  useEffect(() => {
    // Subtle breathing animation for the enter button
    gsap.to(".pulse-btn", {
      scale: 1.05,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/spider_man.mp3" 
        loop 
        preload="metadata"
      />
      
      {!hasStarted && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background Ambience */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/30 blur-[120px] rounded-full animate-pulse" />
          </div>

          <div ref={textRef} className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="mb-12 flex items-center gap-3 opacity-80">
               <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500">
                <path d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold tracking-[0.5em] uppercase text-sm">Kunal Chauhan</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter max-w-2xl leading-none">
              Initializing <span className="font-serif italic text-red-500">The Mission Profile</span>
            </h1>

            <button 
              onClick={startExperience}
              className="pulse-btn group relative px-12 py-5 rounded-full border border-red-500/30 bg-white/5 text-white text-sm tracking-[0.4em] uppercase font-bold hover:bg-red-600 hover:border-red-600 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Initialize Experience</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <p className="mt-8 text-gray-500 font-mono text-[10px] uppercase tracking-widest opacity-60">
              [ Best Experienced with Audio // Encrypted Stream ]
            </p>
          </div>
        </div>
      )}

      {/* Global Audio Controls (Floating small icon) */}
      {hasStarted && (
        <div className="fixed bottom-8 right-8 z-[60] flex items-center gap-4">
           <button 
             onClick={() => {
                const audio = audioRef.current;
                if (audio) {
                  if (audio.paused) audio.play();
                  else audio.pause();
                }
             }}
             className="w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-red-500 hover:border-red-500/30 transition-all duration-300 group"
             title="Toggle Audio"
           >
              <div className="flex items-end gap-[2px] h-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className={`w-[2px] bg-current animate-[music-bar_1.2s_infinite_ease-in-out]`} style={{ height: `${20 + (i * 20)}%`, animationDelay: `${i * 0.1}s` }} />
                 ))}
              </div>
           </button>
           <style dangerouslySetInnerHTML={{__html: `
              @keyframes music-bar {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(2); }
              }
           `}} />
        </div>
      )}
    </>
  );
}
