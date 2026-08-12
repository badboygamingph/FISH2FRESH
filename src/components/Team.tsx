import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Facebook, Mail } from 'lucide-react';

import darielImg from '../assets/images/leiradnoznag.webp';

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mathematically perfect horizontal translation for full viewport width slides
  const trackX = useTransform(scrollYProgress, (v) => `calc(${-v * 100}% + ${v * 100}vw)`);

  const teamMembers = [
    {
      name: 'Dariel Ganzon',
      role: 'System Developer',
      subRole: 'Architect & Lead Engineer',
      image: darielImg,
      bio: 'Architected and built the entire FISH2FRESH ecosystem, integrating on-device AI with a modern web interface.',
      socials: { facebook: '#', mail: '#' }
    },
    {
      name: 'Jan Clyde Villavelez',
      role: 'Assistant Developer',
      subRole: 'Project Manager & UX Analyst',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
      bio: 'Provides essential support in organizing project milestones, user experience testing, and system analysis.',
      socials: { facebook: '#', mail: '#' }
    },
    {
      name: 'Assistant Dev',
      role: 'Assistant Developer',
      subRole: 'Model Optimization & Testing',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop',
      bio: 'Assists in system development, testing, and optimizing the freshness detection models for peak performance.',
      socials: { facebook: '#', mail: '#' }
    }
  ];

  return (
    <section id="team" className="bg-[#050505] text-white relative">
      <div ref={containerRef} className="h-[400vh] relative">
        
        {/* Sticky Inner Container */}
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden">
          
          {/* Background Typography (Fixed position behind the track) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <h2 className="text-[20vw] font-black italic whitespace-nowrap text-white/[0.02] tracking-tighter">
              TEAM
            </h2>
          </div>

          {/* Horizontal Sliding Track */}
          <div className="relative z-10 w-full h-[100dvh]">
            <motion.div 
              style={{ x: trackX }}
              className="flex w-[max-content] h-full items-center"
            >
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="w-[100vw] shrink-0 h-full flex flex-col justify-center px-4 sm:px-8 relative"
                >
                  <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 h-auto md:h-full py-20 md:py-0">
                    
                    {/* Left Side: Image Container */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end h-[40vh] md:h-[60vh] lg:h-[70vh]">
                      <div className="relative h-full w-[70vw] md:w-[350px] lg:w-[450px] shrink-0 border border-white/5 bg-[#0a0a0a]">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37] z-20"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37] z-20"></div>
                        
                        {/* Number Overlay */}
                        <div className="absolute top-4 left-6 md:top-6 md:left-8 text-white/50 font-black text-4xl md:text-5xl italic leading-none z-20 mix-blend-overlay">
                          0{index + 1}
                        </div>

                        {/* Image */}
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale brightness-90 contrast-125"
                        />
                      </div>
                    </div>

                    {/* Right Side: Typography */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left h-auto md:h-[60vh] lg:h-[70vh]">
                      <span className="text-[#D4AF37] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 md:mb-4">
                        {member.role}
                      </span>
                      
                      <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                        {member.name.split(' ').map((word, i) => (
                          <React.Fragment key={i}>
                            {word}
                            {i !== member.name.split(' ').length - 1 && <br className="hidden md:block" />}
                            {i !== member.name.split(' ').length - 1 && <span className="md:hidden"> </span>}
                          </React.Fragment>
                        ))}
                      </h3>
                      
                      <span className="text-[#D4AF37] text-base md:text-lg italic mt-4 md:mt-6 font-serif">
                        {member.subRole}
                      </span>
                      
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4 md:mt-6 max-w-md mx-auto md:mx-0">
                        {member.bio}
                      </p>
                      
                      <div className="flex items-center justify-center md:justify-start gap-4 mt-8 pt-6 border-t border-white/5 w-full max-w-xs mx-auto md:mx-0">
                        {member.socials.facebook && (
                          <a href={member.socials.facebook} onClick={(e) => e.preventDefault()} aria-label={`${member.name} Facebook`} className="text-slate-500 hover:text-[#D4AF37] transition-colors">
                            <Facebook size={20} />
                          </a>
                        )}
                        {member.socials.mail && (
                          <a href={member.socials.mail} onClick={(e) => e.preventDefault()} aria-label={`Email ${member.name}`} className="text-slate-500 hover:text-[#D4AF37] transition-colors">
                            <Mail size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Scroll Progress Line */}
          <div className="absolute bottom-8 left-6 right-6 md:left-24 md:right-24 h-[1px] bg-white/5 z-20 pointer-events-none">
            <motion.div 
              className="h-full bg-[#D4AF37] origin-left shadow-[0_0_10px_#D4AF37]" 
              style={{ scaleX: scrollYProgress }}
            ></motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
