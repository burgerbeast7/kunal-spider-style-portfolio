import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    category: "Mastery",
    items: ["Python", "Django", "React.js", "PostgreSQL", "AWS"]
  },
  {
    category: "Engineering Core",
    items: ["DSA", "System Design", "OOP", "Networking", "Unix/Linux"]
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Git", "CI/CD", "Vercel", "Netlify"]
  },
  {
    category: "Languages",
    items: ["Python", "JavaScript", "C++", "HTML5", "CSS3"]
  },
  {
    category: "Frameworks/Libs",
    items: ["DRF", "Flask", "Express.js", "Tailwind CSS", "Bootstrap", "GSAP"]
  },
  {
    category: "AI / Intel",
    items: ["OpenAI API", "DialoGPT", "NLP", "Machine Learning"]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-category", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 1, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 bg-[#030303] px-6 md:px-12 lg:px-24">
      <div className="max-w-[90rem] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 tracking-tighter border-b border-white/10 pb-8">
          Technical <span className="font-serif italic text-gray-500">Arsenal</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup, i) => (
            <div key={i} className="skill-category bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-500 group">
              <h3 className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] font-bold mb-6 group-hover:text-white transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, j) => (
                  <span key={j} className="px-4 py-2 bg-black border border-white/10 rounded-full text-gray-400 text-sm font-medium hover:border-red-500/50 hover:text-white transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
