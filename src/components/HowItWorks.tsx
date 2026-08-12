import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, ScanSearch, CheckSquare, CheckCircle2, AlertTriangle, XCircle, MoveHorizontal, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DotGrid from './DotGrid';

export default function HowItWorks() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mathematically perfect horizontal translation
  // Moves the track precisely from its natural left position to aligning its right edge with the screen's right edge
  const trackX = useTransform(scrollYProgress, (v) => `calc(${-v * 100}% + ${v * 100}vw)`);

  const steps = [
    {
      icon: Camera,
      title: t.howItWorks.s1_title,
      description: t.howItWorks.s1_desc,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      icon: ScanSearch,
      title: t.howItWorks.s2_title,
      description: t.howItWorks.s2_desc,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200"
    },
    {
      icon: CheckSquare,
      title: t.howItWorks.s3_title,
      description: t.howItWorks.s3_desc,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    }
  ];

  return (
    <section id="how-it-works" className="relative bg-white overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <DotGrid
          dotSize={6}
          gap={24}
          baseColor="#f1f5f9"
          activeColor="#3b82f6"
          proximity={180}
          shockRadius={250}
        />
      </div>

      {/* Scrollytelling Section */}
      <div ref={containerRef} className="h-[400vh] relative pt-20 md:pt-32">
        {/* Sticky Container */}
        <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden">
          
          {/* Header (Sticky inside the container) */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-10 md:mb-16">
            <div className="text-center md:text-left max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 mb-4 md:mb-6">
                {t.howItWorks.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 font-light">
                {t.howItWorks.desc}
              </p>
            </div>
          </div>

          {/* Horizontal Sliding Track */}
          <div className="relative z-10 w-full overflow-hidden py-4">
            <motion.div 
              style={{ x: trackX }}
              className="flex gap-6 md:gap-12 px-6 md:px-[10vw] w-[max-content] items-center"
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index}
                    className="w-[85vw] sm:w-[450px] md:w-[600px] shrink-0"
                  >
                    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:border-blue-200 hover:shadow-blue-900/5 transition-all duration-500 group h-full">
                      
                      {/* Icon Section */}
                      <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-full border-2 border-dashed opacity-50 ${step.border} group-hover:rotate-12 transition-transform duration-700 ease-out`}></div>
                        <div className={`absolute inset-4 rounded-full opacity-20 ${step.bg} group-hover:scale-110 transition-transform duration-500`}></div>
                        <Icon className={`w-16 h-16 md:w-24 md:h-24 relative z-10 ${step.color}`} strokeWidth={1} />
                        
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-[4rem] md:text-[6rem] font-black italic text-slate-900/5 leading-none select-none pointer-events-none">
                          0{index + 1}
                        </div>
                      </div>

                      {/* Text Section */}
                      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                        <div className={`inline-flex items-center justify-center md:justify-start gap-3 mb-4`}>
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${step.color} ${step.bg} ${step.border}`}>
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Step {index + 1}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base md:text-lg">
                          {step.description}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Freshness Scale Visualizer (Below Sticky Section) */}
      <div className="py-24 md:py-32 max-w-6xl mx-auto px-4 relative z-10 bg-white border-t border-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm tracking-wide mb-4 md:mb-6">
              <Brain size={16} className="text-blue-600" />
              <span>{t.howItWorks.analysis}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 px-2">{t.howItWorks.classTitle}</h2>
            
            {/* Mobile Swipe Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6 lg:hidden text-slate-500 text-sm font-medium animate-pulse">
              <MoveHorizontal size={16} className="opacity-70" />
              <span>Swipe to explore</span>
            </div>
          </div>
        </motion.div>
        
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 md:gap-8 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0 lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.03, y: -12 }}
            className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <CheckCircle2 size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
              {t.howItWorks.c1_title}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
            </h3>
            <p className="text-slate-700 font-light leading-relaxed text-lg flex-grow">
              {t.howItWorks.c1_desc}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.03, y: -12 }}
            className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] hover:border-amber-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <AlertTriangle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
              {t.howItWorks.c2_title}
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse"></span>
            </h3>
            <p className="text-slate-700 font-light leading-relaxed text-lg flex-grow">
              {t.howItWorks.c2_desc}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.03, y: -12 }}
            className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)] hover:border-rose-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <XCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
              {t.howItWorks.c3_title}
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse"></span>
            </h3>
            <p className="text-slate-700 font-light leading-relaxed text-lg flex-grow">
              {t.howItWorks.c3_desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
