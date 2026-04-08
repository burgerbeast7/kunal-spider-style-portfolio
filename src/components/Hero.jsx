import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './HeroShaders';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  
  // Create refs to hold things that need cleanup or updates
  const uniformRef = useRef(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Initial Hero Entrance Animation (AOS style smooth fade-up)
    gsap.fromTo(container, 
      { opacity: 0, y: 80 }, 
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.1 }
    );
    
    // Text entrance animation (Fade down)
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );
    }
    
    // 1. Setup Three.js Scene
    const scene = new THREE.Scene();
    
    // We use an orthographic camera to map perfectly to a screen setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    container.appendChild(renderer.domElement);

    // 2. Load textures
    const textureLoader = new THREE.TextureLoader();
    let isTexturesLoaded = false;
    
    // Define uniforms up front so they can be mutated
    const uniforms = {
      uTexture1: { value: null }, // Spiderman (Base)
      uTexture2: { value: null }, // Man (Reveal)
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHovered: { value: 0.0 }, // 0 to 1 value smoothly handled by GSAP
      uRadius: { value: 0.35 }, // Reveal radius size
      uSoftness: { value: 0.25 }, // Softness of the edge
      uScale: { value: 0.08 }, // Scale zoom amount
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1920, 1080) } // Assuming 16:9 for default
    };
    
    uniformRef.current = uniforms;

    Promise.all([
      textureLoader.loadAsync(imgSpiderman),
      textureLoader.loadAsync(imgMan)
    ]).then(([tex1, tex2]) => {
      // Improve texture visual quality
      tex1.generateMipmaps = false;
      tex1.minFilter = THREE.LinearFilter;
      tex1.magFilter = THREE.LinearFilter;
      
      tex2.generateMipmaps = false;
      tex2.minFilter = THREE.LinearFilter;
      tex2.magFilter = THREE.LinearFilter;
      
      uniforms.uTexture1.value = tex1;
      uniforms.uTexture2.value = tex2;
      
      // Update image resolution based on the first loaded texture's actual dimensions
      if (tex1.image) {
        uniforms.uImageResolution.value.set(tex1.image.width, tex1.image.height);
      }
      
      isTexturesLoaded = true;
    });

    // 3. Create full-screen plane geometry and shader material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. GSAP Ticker for render loop and smooth lerping
    const renderTick = () => {
      if (!isTexturesLoaded) return;
      
      // Lerp the mouse coordinates smoothly
      mouseCurrent.current.x = gsap.utils.interpolate(mouseCurrent.current.x, mouseTarget.current.x, 0.1);
      mouseCurrent.current.y = gsap.utils.interpolate(mouseCurrent.current.y, mouseTarget.current.y, 0.1);
      
      uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
      
      // Also update DOM custom cursor position if needed
      if(cursorRef.current) {
        gsap.set(cursorRef.current, {
           x: mouseCurrent.current.x * width,
           y: mouseCurrent.current.y * height, // using normalized, so 0 top wait...
           // Actually threejs UV y is 0 bottom, 1 top. But our uMouse is updated below. Let's fix cursor DOM below.
        });
      }

      renderer.render(scene, camera);
    };
    
    gsap.ticker.add(renderTick);

    // 5. Setup interaction event handlers
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width;
      // In Three.js UV space, Y=0 is bottom, Y=1 is top.
      const y = 1.0 - ((e.clientY - rect.top) / height);
      
      mouseTarget.current.x = x;
      mouseTarget.current.y = y;
      
      // For DOM cursor, use standard coordinates
      if(cursorRef.current) {
        // Just store regular pixel coords in DOM cursor directly for zero latency, 
        // to have a quick cursor overlay if desired
        gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
      }
    };
    
    const onMouseEnter = () => {
      setIsHovered(true);
      gsap.to(uniforms.uHovered, {
        value: 1.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };
    
    const onMouseLeave = () => {
      setIsHovered(false);
      gsap.to(uniforms.uHovered, {
        value: 0.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    // 6. Handle resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    
    window.addEventListener('resize', onResize);

    // Mobile fallback (Tap)
    const onTouch = (e) => {
        if(e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            mouseTarget.current.x = (touch.clientX - rect.left) / width;
            mouseTarget.current.y = 1.0 - ((touch.clientY - rect.top) / height);
            
            // Toggle hover effect on touch
            if (!isHovered) {
                onMouseEnter();
            }
        }
    };
    
    container.addEventListener('touchstart', onTouch);
    container.addEventListener('touchmove', onTouch);

    // 7. Cleanup
    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouch);
      container.removeEventListener('touchmove', onTouch);
      
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      // NOTE: should realistically dispose textures too 
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 select-none"
      />
      
      {/* Custom Cursor / Light Bloom Overlay */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-20 mix-blend-screen opacity-0 scale-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          transform: 'translate(-50%, -50%)' // Center the glow on the mouse point
        }}
      />
      
      {/* Foreground UI Components */}
      <div ref={textRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center mx-auto w-full max-w-[95rem] px-8 lg:px-16">
        <div 
          className="w-full flex flex-col md:flex-row justify-between items-center md:items-end transition-all duration-700 ease-out transform gap-16 md:gap-24" 
          style={{ transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)' }}
        >
            
          {/* Left Side: Intro and Title */}
          <div className="flex-1 text-left w-full md:w-auto">
            <p className="text-xs md:text-sm text-red-500 font-mono tracking-[0.4em] uppercase mb-6 opacity-90 drop-shadow-md">
              [ Mission Profile // 2026 ]
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6.5rem] font-bold tracking-tighter drop-shadow-2xl leading-[0.9] font-sans">
              KUNAL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-serif italic font-light pr-4">CHAUHAN</span>
            </h1>
            <p className="mt-6 text-sm md:text-base text-gray-400 font-mono tracking-widest uppercase opacity-80">
              Software Engineer // Full-Stack Expert
            </p>
          </div>
          
          {/* Right Side: Description and CTA */}
          <div className="flex-1 max-w-xl text-left md:text-right flex flex-col items-start md:items-end">
            <p className="text-lg md:text-xl text-gray-300 drop-shadow-xl font-light tracking-wide leading-relaxed mb-10 max-w-md">
              Specialized in Django, React.js, and scaling high-performance full-stack applications on AWS.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-start md:justify-end pointer-events-auto">
              <a href="#projects" className="px-8 py-3 rounded-full bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-red-600 hover:text-white transition-all duration-500 shadow-2xl">
                View Missions
              </a>
              <a href="/resume.pdf" download className="px-8 py-3 rounded-full border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white/10 backdrop-blur-md transition-all duration-500 flex items-center gap-2 group/cv">
                <span>Download CV</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/cv:translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
          </div>
            
        </div>
      </div>
      
      {/* Overlay border/frame for cinematic effect */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
