import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CinematicEntrance from './components/CinematicEntrance';
import SmoothScroll from './components/SmoothScroll';

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
          <About />
          <Skills />
          <Experience />
          <Achievements />
          <Projects />
          <Contact />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
