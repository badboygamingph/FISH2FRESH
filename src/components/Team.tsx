import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

import Aurora from './Aurora';
import darielImg from '../assets/images/leiradnoznag.webp';

const teamMembers = [
  {
    name: 'Dariel Ganzon',
    role: 'System Developer',
    image: darielImg,
    bio: 'Architected and built the entire FISH2FRESH ecosystem, integrating on-device AI with a modern web interface.',
    socials: { github: '#', linkedin: '#', mail: '#' }
  },
  {
    name: 'Jan Clyde Villavelez',
    role: 'Project Assistant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'Provides essential support in organizing project milestones, user experience testing, and system analysis.',
    socials: { linkedin: '#', mail: '#' }
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Aurora
          colorStops={["#60a5fa", "#818cf8", "#22d3ee"]}
          blend={0.7}
          amplitude={1.2}
          speed={0.4}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100"
          >
            <Sparkles size={16} />
            <span>Meet the Creators</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            The Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">FISH2FRESH</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            We are a passionate group of developers, researchers, and designers dedicated to revolutionizing seafood quality assessment through on-device artificial intelligence.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto sm:justify-center pb-8 -mx-4 px-4 snap-x snap-mandatory gap-6 md:gap-12 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 sm:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="w-[85vw] sm:w-[360px] lg:w-[400px] shrink-0 snap-center group relative rounded-3xl overflow-hidden aspect-[3/4] sm:aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Full Image */}
              <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              
              {/* Gradient Overlay - Always partially visible at bottom, full on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-95 lg:opacity-80 lg:group-hover:opacity-95 transition-opacity duration-500" />
              
              {/* Content Container */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white text-left z-10 overflow-hidden">
                <div className="transform translate-y-0 lg:translate-y-[120px] lg:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                  
                  <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-100">
                    <p className="text-slate-200 text-sm mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                      {member.socials.github && (
                        <a href={member.socials.github} aria-label={`${member.name} GitHub`} onClick={(e) => e.preventDefault()} className="text-slate-300 hover:text-white transition-colors hover:scale-110">
                          <Github size={20} />
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} aria-label={`${member.name} LinkedIn`} onClick={(e) => e.preventDefault()} className="text-slate-300 hover:text-blue-400 transition-colors hover:scale-110">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.socials.mail && (
                        <a href={member.socials.mail} aria-label={`Email ${member.name}`} onClick={(e) => e.preventDefault()} className="text-slate-300 hover:text-red-400 transition-colors hover:scale-110">
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
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
