import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Waves, Sparkles, Beef, ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import anatomyImg from '../assets/images/fresh_fish_anatomy_1786286635448.webp';
import Beams from './Beams';

function ImageWithSkeleton({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 z-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <ImageIcon className="text-slate-400" size={48} />
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

export default function VisualIndicators() {
  const { t } = useLanguage();

  const indicators = [
    {
      icon: Eye,
      title: t.indicators.i1_title,
      description: t.indicators.i1_desc,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: Waves,
      title: t.indicators.i2_title,
      description: t.indicators.i2_desc,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100'
    },
    {
      icon: Sparkles,
      title: t.indicators.i3_title,
      description: t.indicators.i3_desc,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
    {
      icon: Beef,
      title: t.indicators.i4_title,
      description: t.indicators.i4_desc,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    }
  ];

  return (
    <section id="indicators" className="relative py-20 md:py-32 bg-[#09090b] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pointer-events-none">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 pointer-events-none">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white mb-4 md:mb-6"
          >
            {t.indicators.title} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t.indicators.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-400 font-light leading-relaxed"
          >
            {t.indicators.desc}
          </motion.p>
        </div>

        <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 items-center pointer-events-none">
          <motion.div
            className="xl:w-1/2 w-full order-1 xl:order-2 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-blue-900/20 rounded-[2.5rem] md:rounded-[3rem] transform rotate-3 scale-105 backdrop-blur-md"></div>
            <div className="relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
              <ImageWithSkeleton
                src={anatomyImg}
                alt="Fish Anatomy"
                className="w-full h-full object-cover object-center relative z-10 opacity-90"
              />

              {/* Connective Lines (SVG Overlay) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                {/* Eyes Line */}
                <line x1="17" y1="25" x2="17" y2="49" stroke="rgba(96,165,250,0.6)" strokeWidth="1.5" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                <circle cx="17" cy="49" r="0.8" fill="rgba(96,165,250,1)" vectorEffect="non-scaling-stroke" />

                {/* Gills Line */}
                <line x1="27" y1="78" x2="27" y2="54" stroke="rgba(251,113,133,0.6)" strokeWidth="1.5" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                <circle cx="27" cy="54" r="0.8" fill="rgba(251,113,133,1)" vectorEffect="non-scaling-stroke" />

                {/* Skin Line */}
                <line x1="45" y1="18" x2="45" y2="42" stroke="rgba(251,191,36,0.6)" strokeWidth="1.5" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                <circle cx="45" cy="42" r="0.8" fill="rgba(251,191,36,1)" vectorEffect="non-scaling-stroke" />

                {/* Meat Line */}
                <line x1="60" y1="78" x2="60" y2="52" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
                <circle cx="60" cy="52" r="0.8" fill="rgba(52,211,153,1)" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* Marker Labels & Pulses */}
              {/* 1. Clear Eyes */}
              <div className="absolute z-30 flex flex-col items-center" style={{ top: '25%', left: '17%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs font-bold text-blue-400 mb-2 shadow-lg border border-blue-900 whitespace-nowrap">{indicators[0].title}</div>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse border-2 border-white/20"></div>
              </div>

              {/* 2. Vibrant Gills */}
              <div className="absolute z-30 flex flex-col items-center" style={{ top: '78%', left: '27%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-pulse border-2 border-white/20" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs font-bold text-rose-400 mt-2 shadow-lg border border-rose-900 whitespace-nowrap">{indicators[1].title}</div>
              </div>

              {/* 3. Shiny Skin */}
              <div className="absolute z-30 flex flex-col items-center" style={{ top: '18%', left: '45%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs font-bold text-amber-400 mb-2 shadow-lg border border-amber-900 whitespace-nowrap">{indicators[2].title}</div>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse border-2 border-white/20" style={{ animationDelay: '0.4s' }}></div>
              </div>

              {/* 4. Firm Body Meat */}
              <div className="absolute z-30 flex flex-col items-center" style={{ top: '78%', left: '60%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse border-2 border-white/20" style={{ animationDelay: '0.6s' }}></div>
                <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs font-bold text-emerald-400 mt-2 shadow-lg border border-emerald-900 whitespace-nowrap">{indicators[3].title}</div>
              </div>
            </div>
          </motion.div>

          <div className="xl:w-1/2 w-full order-2 xl:order-1">
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 md:gap-8">
              {indicators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    className={`w-full sm:min-w-0 p-6 md:p-8 rounded-[2rem] bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl shadow-black/50 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden pointer-events-auto`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-current to-transparent opacity-[0.08] rounded-bl-[2rem] transition-transform duration-700 group-hover:scale-110 ${item.color.replace('600', '400')}`}></div>
                    <div className="relative z-10 flex flex-col items-start gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 bg-white/10 ${item.color.replace('600', '400')}`}>
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed font-light text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
