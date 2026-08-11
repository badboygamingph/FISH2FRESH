import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

import Aurora from './Aurora';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Lead AI Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    bio: 'Specializes in computer vision and on-device machine learning model optimization for edge devices.',
    socials: { github: '#', linkedin: '#', mail: '#' }
  },
  {
    name: 'Michael Chen',
    role: 'Frontend Architect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    bio: 'Crafts buttery-smooth user interfaces and seamless cross-platform experiences using React.',
    socials: { github: '#', linkedin: '#', mail: '#' }
  },
  {
    name: 'Dr. Elena Rodriguez',
    role: 'Marine Biologist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
    bio: 'Provides expert domain knowledge in fish species classification and freshness indicators.',
    socials: { linkedin: '#', mail: '#' }
  },
  {
    name: 'David Kim',
    role: 'UX/UI Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    bio: 'Designs intuitive workflows that make complex AI technology accessible and easy to use for everyone.',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
              
              <div className="relative mb-6 inline-block w-full text-center">
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden shadow-md ring-4 ring-white relative z-10 group-hover:scale-105 transition-transform duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                {/* Decorative glow behind image */}
                <div className="absolute inset-0 bg-blue-100 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150 -z-10"></div>
              </div>
              
              <div className="text-center relative z-10 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                <p className="text-sm font-semibold text-blue-500 mb-4">{member.role}</p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
                  {member.bio}
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100 mt-auto">
                  {member.socials.github && (
                    <a href={member.socials.github} onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-slate-900 transition-colors duration-300 hover:scale-110">
                      <Github size={20} />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-blue-600 transition-colors duration-300 hover:scale-110">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.socials.mail && (
                    <a href={member.socials.mail} onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-red-500 transition-colors duration-300 hover:scale-110">
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
