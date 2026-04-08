import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black border-t border-white/5 px-6 md:px-12">
      <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo/Name */}
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500">
            <path d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white font-bold tracking-widest uppercase text-xs">
            Kunal Chauhan
          </span>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] text-center md:text-right">
          © {currentYear} Kunal Chauhan. All Rights Reserved. // Engineered with Passion.
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center space-x-6">
           <a href="https://www.instagram.com/kunal.3.6.3.4?igsh=MWZybG9rNnhmN3VmMA==" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
           </a>
           <a href="https://github.com/burgerbeast7" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
           </a>
           <a href="https://www.linkedin.com/in/kunal-chauhan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
           </a>
        </div>

      </div>
    </footer>
  );
}
