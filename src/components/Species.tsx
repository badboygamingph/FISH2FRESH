import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DotField from './DotField';

import frigateImg from '../assets/images/frigate_tuna_1786286498933.webp';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import mackerelImg from '../assets/images/mackerel_tuna_1786286531308.webp';

export default function Species() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  useEffect(() => {
    // Check initial
    const media = window.matchMedia('(min-width: 768px)');
    setIsDesktop(media.matches);
    
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const speciesList = [
    {
      id: 'frigate-tuna',
      name: 'Frigate Tuna',
      localName: 'Pirit',
      description: t.species.sp1_desc,
      image: frigateImg,
      traits: [
        t.species.sp1_t1,
        t.species.sp1_t2,
        t.species.sp1_t3
      ],
      accentColor: 'bg-indigo-500',
      badgeBg: 'bg-indigo-500/20',
      badgeText: 'text-indigo-300',
      iconColor: 'text-indigo-400'
    },
    {
      id: 'skipjack-tuna',
      name: 'Skipjack Tuna',
      localName: 'Tulingan',
      description: t.species.sp2_desc,
      image: skipjackImg,
      traits: [
        t.species.sp2_t1,
        t.species.sp2_t2,
        t.species.sp2_t3
      ],
      accentColor: 'bg-blue-500',
      badgeBg: 'bg-blue-500/20',
      badgeText: 'text-blue-300',
      iconColor: 'text-blue-400'
    },
    {
      id: 'mackerel-tuna',
      name: 'Mackerel Tuna',
      localName: 'Karaw',
      description: t.species.sp3_desc,
      image: mackerelImg,
      traits: [
        t.species.sp3_t1,
        t.species.sp3_t2,
        t.species.sp3_t3
      ],
      accentColor: 'bg-cyan-500',
      badgeBg: 'bg-cyan-500/20',
      badgeText: 'text-cyan-300',
      iconColor: 'text-cyan-400'
    }
  ];

  // Map scroll progress to horizontal translation
  // This smoothly moves the track from 0 to exactly the end of the content
  const trackX = useTransform(scrollYProgress, (v) => `calc(${-v * 100}% + ${v * 100}vw)`);

  return (
    <section ref={containerRef} id="species" className={`relative ${isDesktop ? 'h-[400vh]' : 'h-auto py-20'} bg-slate-900 text-white`}>
      {/* Sticky Inner Container */}
      <div className={`${isDesktop ? 'sticky top-0 h-[100dvh]' : 'relative min-h-screen pb-10'} w-full flex flex-col justify-center overflow-hidden`}>
        
        {/* Background Dot Field */}
        <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={250}
            sparkle={true}
            waveAmplitude={0}
            gradientFrom="rgba(56, 189, 248, 0.4)" /* sky-400 */
            gradientTo="rgba(99, 102, 241, 0.25)"  /* indigo-500 */
            glowColor="#1e3a8a" /* blue-900 */
          />
        </div>

        {/* Header Content */}
        <div className="container mx-auto px-6 mb-8 md:mb-12 relative z-10 text-center md:text-left pt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tighter"
          >
            {t.species.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0 font-light"
          >
            {t.species.desc}
          </motion.p>
          <div className={`flex items-center justify-center md:justify-start gap-4 mt-6 ${isDesktop ? '' : 'hidden'}`}>
            <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Scroll down to view species</span>
            <div className="h-[1px] w-12 bg-cyan-500/50"></div>
          </div>
        </div>

        {/* Horizontal Sliding Track or Vertical List on Mobile */}
        <div className="relative z-10 w-full overflow-hidden pb-10 md:pb-0">
          <motion.div 
            style={isDesktop ? { x: trackX } : {}}
            className={`flex ${isDesktop ? 'gap-6 md:gap-12 px-6 md:px-[5vw] w-[max-content]' : 'flex-col gap-12 px-6 w-full'}`}
          >
            {speciesList.map((species, index) => (
              <div 
                key={index}
                className={isDesktop ? "w-[85vw] sm:w-[500px] md:w-[900px] shrink-0" : "w-full"}
              >
                <div className="flex flex-col md:flex-row bg-slate-900/60 backdrop-blur-2xl rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden group hover:bg-slate-900/80 hover:border-white/20 transition-all duration-500 shadow-2xl h-full">
                  {/* Image Side */}
                  <div className="w-full md:w-[45%] relative aspect-[2/1] sm:aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden shrink-0 bg-slate-800">
                    <div className={`absolute inset-0 z-10 opacity-20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-10 ${species.accentColor}`}></div>
                    <img 
                      src={species.image} 
                      alt={species.name} 
                      loading="lazy"
                      className="absolute w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white/30 font-black text-3xl md:text-5xl italic leading-none drop-shadow-lg z-20">
                      0{index + 1}
                    </div>
                  </div>
                
                  {/* Content Side */}
                  <div className="w-full md:w-[55%] p-4 sm:p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                      <h3 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">{species.name}</h3>
                      <div className={`self-start sm:self-auto flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full ${species.badgeBg} ${species.badgeText} text-[10px] md:text-xs font-semibold tracking-wide border border-white/10 shadow-sm`}>
                        <Tag size={12} />
                        {species.localName}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-8 font-light">
                      {species.description}
                    </p>
                    
                    <div className="pt-4 md:pt-6 border-t border-slate-700/50 mt-auto">
                      <h4 className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4">{t.species.keyId}</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-8">
                        {species.traits.map((trait, i) => (
                          <li key={i} className="flex items-start gap-2 md:gap-2.5">
                            <CheckCircle2 size={14} className={`shrink-0 mt-0.5 md:mt-0 ${species.iconColor} md:w-4 md:h-4`} />
                            <span className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">{trait}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/species/${species.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className={`inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-white ${species.accentColor} hover:brightness-110 shadow-lg rounded-xl px-4 py-2 md:px-5 md:py-2.5 w-full sm:w-fit justify-center transition-all duration-300 hover:pr-3 group/btn`}
                      >
                        Read Full Details
                        <ArrowRight size={14} className="md:w-4 md:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Progress Bar */}
        {isDesktop && (
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 z-50 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-cyan-500 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
