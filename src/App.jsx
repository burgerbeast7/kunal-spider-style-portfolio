import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicEntrance from './components/CinematicEntrance';
import SmoothScroll from './components/SmoothScroll';
import Footer from './components/Footer';

// Lazy load sections below the fold
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="bg-black text-white selection:bg-red-500/30">
      <SmoothScroll />
      <CinematicEntrance onStarted={() => setShowContent(true)} />
      
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <Navbar />
        <Hero />
        
        <div className="space-y-32 md:space-y-48 pb-32">
          <Suspense fallback={<div className="h-screen flex items-center justify-center text-red-500 font-mono text-xs uppercase tracking-widest animate-pulse">Loading Mission Data...</div>}>
            <About />
            <Skills />
            <Experience />
            <Achievements />
            <Projects />
            <Contact />
          </Suspense>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
