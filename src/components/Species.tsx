import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Tag, CheckCircle2, ImageIcon, MoveHorizontal, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DotField from './DotField';
import frigateImg from '../assets/images/frigate_tuna_1786286498933.jpg';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.jpg';
import mackerelImg from '../assets/images/mackerel_tuna_1786286531308.jpg';

function ImageWithSkeleton({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <ImageIcon className="text-slate-700" size={32} />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function Species() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
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

  return (
    <section ref={containerRef} id="species" className="relative py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
      {/* Interactive Dot Field Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-auto">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            {t.species.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto md:mx-0"
          >
            {t.species.desc}
          </motion.p>
          
          {/* Mobile Swipe Indicator (Optional for pagination) */}
          <div className="flex items-center justify-center md:justify-start gap-2 mt-6 lg:hidden text-slate-400 text-sm font-medium">
            <span>Select species below</span>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {speciesList.map((species, index) => {
              if (index !== activeIndex) return null;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex flex-col lg:flex-row bg-white/5 backdrop-blur-3xl rounded-[1.5rem] lg:rounded-[2.5rem] border border-white/10 overflow-hidden group hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 shadow-2xl relative z-10 w-full max-w-6xl mx-auto`}
                >
                  {/* Image Side - Uncropped, fully visible */}
                  <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto lg:min-h-[550px] overflow-hidden bg-black/40 shrink-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className={`absolute inset-0 z-10 opacity-30 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-10 ${species.accentColor}`}></div>
                    <ImageWithSkeleton 
                      src={species.image} 
                      alt={species.name} 
                      className="relative z-20 w-full h-full object-contain rounded-xl sm:rounded-2xl drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 ring-1 ring-white/5"
                    />
                  </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{species.name}</h3>
                    <div className={`self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full ${species.badgeBg} ${species.badgeText} text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap border border-white/10 shadow-sm`}>
                      <Tag size={14} />
                      {species.localName}
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 font-light">
                    {species.description}
                  </p>
                  
                  <div className="pt-6 sm:pt-8 border-t border-slate-700/50 mt-auto">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">{t.species.keyId}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-8 sm:mb-10">
                      {species.traits.map((trait, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${species.iconColor}`} />
                          <span className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">{trait}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/species/${species.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white ${species.accentColor} hover:brightness-110 shadow-lg rounded-full px-6 py-3.5 w-full sm:w-fit justify-center transition-all duration-300 hover:pr-4 group/btn`}
                    >
                      Read Full Details
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
          
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-6 mt-10 relative z-20">
            <button 
              onClick={() => setActiveIndex((prev) => (prev === 0 ? speciesList.length - 1 : prev - 1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
              aria-label="Previous species"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              {speciesList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setActiveIndex((prev) => (prev === speciesList.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
              aria-label="Next species"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
