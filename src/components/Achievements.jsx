import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  { title: "University Hackathon Winner", icon: "🏆" },
  { title: "AWS Cloud Project Recognition", icon: "☁️" },
  { title: "Open Source Contributor", icon: "✨" },
  { title: "31 LinkedIn Verified Skills", icon: "🏅" }
];

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ach-card", 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((ach, i) => (
          <div key={i} className="ach-card bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center group hover:border-red-500/30 transition-all duration-500">
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{ach.icon}</span>
            <h3 className="text-white text-sm font-bold tracking-tight uppercase">{ach.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
