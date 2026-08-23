import React from 'react';
import { Facebook, Mail } from 'lucide-react';
import { motion } from 'motion/react';

import darielImg from '../assets/images/leiradnoznag.webp';

export default function Team() {
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
    <section id="team" className="text-white relative py-24 md:py-32" style={{ backgroundColor: '#100e0b' }}>
      
      {/* Obsidian Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1 - normal */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #030303 0%, #111111 42%, #1c1c1c 72%, #090909 100%)", mixBlendMode: "normal", pointerEvents: "none", transform: "translateZ(0)" }} aria-hidden="true" />
        {/* Layer 2 - screen */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 45% 55% at 68% 38%, rgba(161,161,170,0.16) 0%, transparent 65%)", mixBlendMode: "screen", filter: "blur(18px)", pointerEvents: "none", transform: "translateZ(0)" }} aria-hidden="true" />
        {/* Film-grain overlay */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.85, pointerEvents: "none" }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0.181 0.608 0.061 0 0.075 0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching ROS Legacy */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[1]">
              Meet the squad.<br/>
              <em className="text-slate-400 font-serif italic font-normal tracking-normal capitalize">Know your developers.</em>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm">
            Three developers. One mission. Hover or focus a card to view their credentials.
          </p>
        </motion.div>

        {/* Grid matching ROS Legacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.article 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              key={index}
              className="relative group h-[450px] md:h-[550px] bg-black overflow-hidden border border-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              tabIndex={0}
            >
              {/* Image with zoom effect */}
              <img 
                src={member.image} 
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay Gradient (Bottom to Top) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Tactical Border Elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 group-hover:border-[#D4AF37] transition-colors duration-500 z-20 m-4"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 group-hover:border-[#D4AF37] transition-colors duration-500 z-20 m-4"></div>
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20"></div>
              
              {/* Large Background Number */}
              <div className="absolute top-6 right-6 text-5xl md:text-6xl font-black italic text-white/10 group-hover:text-white/20 transition-colors duration-500 z-20 mix-blend-overlay">
                0{index + 1}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                
                <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-[#D4AF37]"></span>
                  {member.role}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
                  {member.name}
                </h3>
                
                <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100">
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 mt-2">
                    {member.bio}
                  </p>
                  
                  {/* Tactical View Link / Socials */}
                  <div className="flex items-center justify-end border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      {member.socials.facebook && (
                        <a href={member.socials.facebook} onClick={(e) => e.preventDefault()} aria-label={`${member.name} Facebook`} className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                          <Facebook size={18} />
                        </a>
                      )}
                      {member.socials.mail && (
                        <a href={member.socials.mail} onClick={(e) => e.preventDefault()} aria-label={`Email ${member.name}`} className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
