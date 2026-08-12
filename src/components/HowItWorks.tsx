import { motion, useScroll, useTransform } from 'motion/react';
import { Camera, ScanSearch, CheckSquare, CheckCircle2, AlertTriangle, XCircle, MoveHorizontal } from 'lucide-react';
import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import DotGrid from './DotGrid';

export default function HowItWorks() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      icon: Camera,
      title: t.howItWorks.s1_title,
      description: t.howItWorks.s1_desc
    },
    {
      icon: ScanSearch,
      title: t.howItWorks.s2_title,
      description: t.howItWorks.s2_desc
    },
    {
      icon: CheckSquare,
      title: t.howItWorks.s3_title,
      description: t.howItWorks.s3_desc
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <DotGrid
          dotSize={6}
          gap={24}
          baseColor="#f1f5f9"
          activeColor="#3b82f6"
          proximity={180}
          shockRadius={250}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 mb-4 md:mb-6"
          >
            {t.howItWorks.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg md:text-xl text-slate-700 font-light px-2"
          >
            {t.howItWorks.desc}
          </motion.p>
        </div>

        <div ref={containerRef} className="max-w-5xl mx-auto relative">
          {/* Connecting line for desktop - Background */}
          <div className="hidden md:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-slate-100 z-0"></div>
          
          {/* Animated Scroll-Linked Progress Line */}
          <motion.div 
            className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-blue-400 via-blue-600 to-cyan-400 z-0 origin-top shadow-[0_0_20px_rgba(59,130,246,1)]"
            style={{ height: lineHeight }}
          ></motion.div>
          
          <div className="space-y-24 md:space-y-40">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.4, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                  className={`relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 text-center ${isEven ? 'md:text-right' : 'md:text-left'} w-full`}>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3 md:mb-6">{step.title}</h3>
                    <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed max-w-md mx-auto md:mx-0 inline-block">{step.description}</p>
                  </div>
                  
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-100 flex items-center justify-center text-blue-600 relative z-10 group-hover:scale-110 transition-transform">
                      <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] border-4 border-slate-50 scale-110"></div>
                      <Icon className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Freshness Scale Visualizer */}
        <div className="mt-24 md:mt-40 max-w-6xl mx-auto">
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
                className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] hover:border-emerald-200 transition-all duration-300"
             >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
                  {t.howItWorks.c1_title}
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
                </h3>
                <p className="text-slate-700 font-light leading-relaxed text-lg">
                  {t.howItWorks.c1_desc}
                </p>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.03, y: -12 }}
                className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] hover:border-amber-200 transition-all duration-300"
             >
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <AlertTriangle size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
                  {t.howItWorks.c2_title}
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse"></span>
                </h3>
                <p className="text-slate-700 font-light leading-relaxed text-lg">
                  {t.howItWorks.c2_desc}
                </p>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
                whileHover={{ scale: 1.03, y: -12 }}
                className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/20 border border-slate-100 hover:shadow-[0_20px_40px_rgba(244,63,94,0.15)] hover:border-rose-200 transition-all duration-300"
             >
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <div className="p-6 md:p-8 flex flex-col justify-center relative z-10">
                    <XCircle size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-2xl tracking-tight mb-4 flex items-center gap-3">
                  {t.howItWorks.c3_title}
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse"></span>
                </h3>
                <p className="text-slate-700 font-light leading-relaxed text-lg">
                  {t.howItWorks.c3_desc}
                </p>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
