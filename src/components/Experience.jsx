import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    company: "Bluestock Fintech",
    role: "Software Development Engineer Intern",
    period: "2025",
    description: [
      "Built full-stack IPO web application",
      "JWT authentication implementation",
      "PostgreSQL schema design",
      "AWS deployment & React frontend"
    ]
  },
  {
    company: "GrowthLink",
    role: "Web Development Intern",
    period: "2025",
    description: [
      "Built responsive web apps",
      "Improved performance by 18%",
      "Fixed cross-browser issues"
    ]
  },
  {
    company: "Freelance",
    role: "Tech Content Creator",
    period: "Ongoing",
    description: [
      "Wrote 20+ technical tutorials",
      "SEO optimized content",
      "Cloud + Django topics"
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 }, 
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

      // Cards reveal
      const cards = sectionRef.current.querySelectorAll('.exp-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 bg-black px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center tracking-tighter">
          Career <span className="font-serif italic text-red-500">Timeline</span>
        </h2>

        {/* Vertical Line */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 top-32 bottom-0 w-[1px] bg-gradient-to-b from-red-500/50 via-red-500 to-red-500/50 hidden md:block origin-top" 
        />

        <div className="space-y-24 md:space-y-32">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Spacer for desktop line alignment */}
              <div className="hidden md:block w-[42%]" />
              
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-10 exp-card" />

              {/* Card */}
              <div className="w-full md:w-[42%] exp-card bg-white/[0.03] border border-white/5 p-8 rounded-2xl backdrop-blur-md hover:border-red-500/20 hover:bg-white/[0.05] transition-all duration-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-red-500 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 border border-red-500/20 rounded-full">{exp.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">{exp.role}</h3>
                <p className="text-gray-400 font-medium mb-6 flex items-center gap-2">
                   <span className="w-4 h-[1px] bg-red-500/30" />
                   {exp.company}
                </p>
                <ul className="space-y-3">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-gray-500 text-sm flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-red-500/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
