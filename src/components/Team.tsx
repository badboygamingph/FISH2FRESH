import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
    role: 'Project Assistant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'Provides essential support in organizing project milestones, user experience testing, and system analysis.',
    socials: { facebook: '#', mail: '#' }
  }
];

const MemberContent = ({ member, index }: { member: any, index: number }) => {
  return (
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full h-full max-w-7xl">
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="relative w-[85%] aspect-[3/4] md:w-[420px] overflow-hidden rounded-md group shadow-2xl bg-slate-900 border border-slate-800">
          <div className="absolute inset-0">
             <img src={member.image} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="absolute inset-0 border border-cyan-500/10 pointer-events-none"></div>
          <div className="absolute top-8 left-8 text-white/20 font-black text-6xl italic leading-none drop-shadow-md">
            0{index}
          </div>
        </div>
      </div>
      
      {/* Right Text */}
      <div className="w-full md:w-1/2 text-left space-y-6">
        <div className="space-y-2">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.4em] uppercase block">
            {member.role}
          </span>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            {member.name}
          </h3>
        </div>
        
        <div className="w-16 h-px bg-white/20"></div>
        
        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">
          {member.bio}
        </p>
        
        <div className="pt-6 flex items-center gap-6">
          <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Connect</span>
          <div className="h-[1px] w-12 bg-cyan-500/50"></div>
          
          <div className="flex items-center gap-4">
            {member.socials.facebook && (
              <a href={member.socials.facebook} onClick={(e) => e.preventDefault()} aria-label={`${member.name} Facebook`} className="text-slate-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
            )}
            {member.socials.mail && (
              <a href={member.socials.mail} onClick={(e) => e.preventDefault()} aria-label={`Email ${member.name}`} className="text-slate-400 hover:text-red-400 transition-colors">
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background text parallax
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);
  
  // Member 1 animations (Fade out as user scrolls past 40%)
  const member1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const member1Y = useTransform(scrollYProgress, [0, 0.4, 0.5], ['0%', '0%', '-5%']);
  const member1Scale = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0.95]);
  const member1PointerEvents = useTransform(scrollYProgress, (v) => v < 0.45 ? 'auto' : 'none');

  // Member 2 animations (Fade in as user scrolls past 50%)
  const member2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 1], [0, 0, 1, 1]);
  const member2Y = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 1], ['5%', '5%', '0%', '0%']);
  const member2Scale = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 1], [1.05, 1.05, 1, 1]);
  const member2PointerEvents = useTransform(scrollYProgress, (v) => v >= 0.45 ? 'auto' : 'none');

  return (
    <section id="team" className="bg-slate-950 overflow-hidden text-white relative">
      
      {/* Intro Header Section */}
      <div className="pt-24 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
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
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
            >
              The Team Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">FISH2FRESH</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed"
            >
              We are a passionate group of developers, researchers, and designers dedicated to revolutionizing seafood quality assessment through on-device artificial intelligence.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Sticky Scroll Section for 2 Members */}
      <div ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden will-change-transform">
          
          {/* Background Scrolling Text */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-[0.03] pointer-events-none select-none z-0">
            <motion.h2 
              style={{ x: bgTextX }}
              className="text-[20vw] md:text-[25vw] font-black text-white italic whitespace-nowrap"
            >
              THE TEAM
            </motion.h2>
          </div>

          {/* Member 1 Container */}
          <motion.div 
            style={{ 
              opacity: member1Opacity, 
              y: member1Y, 
              scale: member1Scale,
              pointerEvents: member1PointerEvents as any
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
          >
            <MemberContent member={teamMembers[0]} index={1} />
          </motion.div>

          {/* Member 2 Container */}
          <motion.div 
            style={{ 
              opacity: member2Opacity, 
              y: member2Y, 
              scale: member2Scale,
              pointerEvents: member2PointerEvents as any
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
          >
            <MemberContent member={teamMembers[1]} index={2} />
          </motion.div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 z-50 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-cyan-500 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
      
    </section>
  );
}
