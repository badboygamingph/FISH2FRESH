import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Mail, Sparkles } from 'lucide-react';

import darielImg from '../assets/images/leiradnoznag.webp';

const teamMembers = [
  {
    name: 'Dariel Ganzon',
    role: 'System Developer',
    image: darielImg,
    bio: 'Architected and built the entire FISH2FRESH ecosystem, integrating on-device AI with a modern web interface.',
    socials: { facebook: '#', mail: '#' }
  },
  {
    name: 'Jan Clyde Villavelez',
    role: 'Assistant Developer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'Provides essential support in organizing project milestones, user experience testing, and system analysis.',
    socials: { facebook: '#', mail: '#' }
  },
  {
    name: '[Name Here]',
    role: 'Assistant Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'Assists in system development, testing, and optimizing the freshness detection models.',
    socials: { facebook: '#', mail: '#' }
  }
];

export default function Team() {
  return (
    <section id="team" className="bg-slate-950 py-24 md:py-32 overflow-hidden text-white relative">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="text-[18vw] font-black italic whitespace-nowrap">THE TEAM</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-cyan-400 font-semibold text-sm mb-6 border border-cyan-900/30 shadow-lg"
          >
            <Sparkles size={16} />
            <span>Meet the Creators</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6"
          >
            The Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">FISH2FRESH</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed font-light"
          >
            We are a passionate group of developers, researchers, and designers dedicated to revolutionizing seafood quality assessment through on-device artificial intelligence.
          </motion.p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
              className="bg-slate-900 border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden group hover:border-cyan-500/30 hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-800">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  loading="lazy"
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110" 
                />
                {/* Gradient fade into the content area */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
                
                {/* Number Indicator */}
                <div className="absolute top-6 left-6 text-white/20 font-black text-4xl italic leading-none drop-shadow-md">
                  0{index + 1}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 md:p-8 -mt-16 relative z-10 flex flex-col flex-grow">
                <span className="text-cyan-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3 block">
                  {member.role}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight uppercase">
                  {member.name}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-light flex-grow">
                  {member.bio}
                </p>
                
                {/* Footer / Socials */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Connect</span>
                  <div className="flex items-center gap-4">
                    {member.socials.facebook && (
                      <a href={member.socials.facebook} onClick={(e) => e.preventDefault()} aria-label={`${member.name} Facebook`} className="text-slate-400 hover:text-blue-500 transition-colors hover:scale-110">
                        <Facebook size={20} />
                      </a>
                    )}
                    {member.socials.mail && (
                      <a href={member.socials.mail} onClick={(e) => e.preventDefault()} aria-label={`Email ${member.name}`} className="text-slate-400 hover:text-red-400 transition-colors hover:scale-110">
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
