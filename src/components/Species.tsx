import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DotField from './DotField';

import frigateImg from '../assets/images/frigate_tuna_1786286498933.webp';
import skipjackImg from '../assets/images/skipjack_tuna_1786286515562.webp';
import mackerelImg from '../assets/images/mackerel_tuna_1786286531308.webp';

const SpeciesCard: React.FC<{ species: any, index: number, total: number }> = ({ species, index, total }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Card remains at full scale until the last 30% of the container scroll (when next card approaches)
  const scale = useTransform(smoothProgress, [0, 0.7, 1], [1, 1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.7, 1], [1, 1, 0.4]);

  // Dynamic offset to make cards look physically stacked with clean spacing
  const stickyTop = `calc(5rem + ${index * 1.5}rem)`;

  return (
    // Increased container height to 150vh for a slower, more deliberate scroll pacing
    <div ref={containerRef} className="h-[150vh] w-full relative" style={{ zIndex: index }}>
      <div
        className="sticky w-full flex justify-center items-start px-4 sm:px-6 md:px-8"
        style={{ top: stickyTop }}
      >
        <motion.div
          style={{ scale, opacity }}
          className="w-full max-w-6xl flex flex-col md:flex-row bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden group shadow-2xl hover:border-white/20 transition-colors duration-500 origin-top max-h-[85vh] md:max-h-[80vh] will-change-transform"
        >
          {/* Image Side - Adjusted for better mobile fit */}
          <div className="w-full md:w-[45%] relative h-[200px] sm:h-[250px] md:h-auto md:min-h-[500px] overflow-hidden shrink-0 bg-slate-800">
            <div className={`absolute inset-0 z-10 opacity-30 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-50 ${species.accentColor}`}></div>
            <img
              src={species.image}
              alt={species.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            <div className="absolute top-4 left-4 md:top-8 md:left-8 text-white/40 font-black text-5xl md:text-7xl italic leading-none drop-shadow-xl z-20">
              0{index + 1}
            </div>
          </div>

          {/* Content Side - Scrollable if content is too long on small devices */}
          <div className="w-full md:w-[55%] p-5 sm:p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900/50 to-slate-950/50 overflow-y-auto no-scrollbar">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-sm">{species.name}</h3>
              <div className={`self-start sm:self-auto flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full ${species.badgeBg} ${species.badgeText} text-xs md:text-sm font-bold tracking-wide border border-white/10 shadow-sm backdrop-blur-md shrink-0`}>
                <Tag size={14} />
                {species.localName}
              </div>
            </div>

            <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-6 md:mb-10 font-light drop-shadow-sm">
              {species.description}
            </p>

            <div className="pt-5 md:pt-6 border-t border-slate-700/50 mt-auto">
              <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4">{t.species.keyId}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8">
                {species.traits.map((trait: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 md:mt-1 md:w-5 md:h-5 ${species.iconColor}`} />
                    <span className="text-slate-200 text-xs md:text-base leading-relaxed font-medium">{trait}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/species/${species.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className={`inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-white ${species.accentColor} hover:brightness-110 shadow-lg shadow-black/20 rounded-xl px-5 py-3 md:px-6 md:py-3.5 w-full sm:w-fit justify-center transition-all duration-300 hover:pr-4 group/btn`}
              >
                Read Full Details
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Species() {
  const { t } = useLanguage();

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
    <section id="species" className="relative bg-slate-900 text-white pb-32">
      {/* Background Dot Field */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={24}
          bulgeStrength={40}
          glowRadius={250}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(56, 189, 248, 0.4)" /* sky-400 */
          gradientTo="rgba(99, 102, 241, 0.25)"  /* indigo-500 */
          glowColor="#1e3a8a" /* blue-900 */
        />
      </div>

      {/* Header Content */}
      <div className="container mx-auto px-6 mb-8 relative z-10 text-center md:text-left pt-24 md:pt-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tighter"
        >
          {t.species.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed"
        >
          {t.species.desc}
        </motion.p>
      </div>

      {/* Vertical Stacking Cards */}
      <div className="relative z-10 w-full mt-10 md:mt-16">
        {speciesList.map((species, index) => (
          <SpeciesCard
            key={species.id}
            species={species}
            index={index}
            total={speciesList.length}
          />
        ))}
      </div>

      {/* Small extra padding at the bottom so the last card has space before the next section */}
      <div className="h-[20vh] w-full"></div>
    </section>
  );
}
