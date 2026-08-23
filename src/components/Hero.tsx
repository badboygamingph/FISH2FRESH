import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Smartphone, CheckCircle2, ArrowRight, AlertTriangle, XCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useDownload } from '../context/DownloadContext';
import { Link } from 'react-router-dom';
import { AppStoreButton, GalaxyStoreButton, GooglePlayButton } from './base/buttons/app-store-buttons';

export default function Hero() {
  const { t } = useLanguage();
  const { startDownload } = useDownload();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scanScenarios = [
    {
      target: 'Skipjack Tuna',
      status: t.hero.fresh,
      icon: CheckCircle2,
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200',
      badgeText: 'text-emerald-700',
      badgeIconText: 'text-emerald-500',
      badgeLabelText: 'text-emerald-600',
    },
    {
      target: 'Frigate Tuna',
      status: t.hero.fairlyFresh,
      icon: AlertTriangle,
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      badgeText: 'text-amber-700',
      badgeIconText: 'text-amber-500',
      badgeLabelText: 'text-amber-600',
    },
    {
      target: 'Mackerel Tuna',
      status: t.hero.spoiled,
      icon: XCircle,
      badgeBg: 'bg-rose-50',
      badgeBorder: 'border-rose-200',
      badgeText: 'text-rose-700',
      badgeIconText: 'text-rose-500',
      badgeLabelText: 'text-rose-600',
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scanScenarios.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [scanScenarios.length]);

  const scenario = scanScenarios[scenarioIndex];
  const StatusIcon = scenario.icon;
  return (
    <section ref={heroRef} className="relative overflow-hidden pt-24 pb-32 md:pt-32 lg:pt-40 lg:pb-48">
      {/* Aura Background: Midnight Sapphire */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
        <div
          className="animate-aurora absolute"
          style={{
            width: "150%",
            height: "150%",
            background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(61,90,255,0.12) 28%, rgb(255,255,255) 18%, rgb(45,55,135) 68%, rgb(20,25,60) 100%)",
            mixBlendMode: "multiply",
            filter: "blur(130px)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          className="animate-aurora absolute"
          style={{
            width: "150%",
            height: "150%",
            background: "linear-gradient(rgba(0,0,0,0) 0%, rgba(61,90,255,0.22) 34%, rgb(255,255,255) 66%, rgb(45,55,135) 82%, rgb(20,25,60) 100%)",
            mixBlendMode: "multiply",
            filter: "blur(130px)",
            pointerEvents: "none",
            animationDelay: "-15s",
            animationDuration: "40s",
            animationDirection: "reverse",
          }}
          aria-hidden="true"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 z-20 relative">
            {/* Readability Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white/60 blur-[100px] rounded-[100%] pointer-events-none -z-10 mix-blend-normal"></div>
            
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1] md:leading-[1.05] mb-6 md:mb-8">
                {t.hero.title1} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{t.hero.title2}</span> {t.hero.title3}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed font-light px-2 sm:px-0">
                {t.hero.desc1} <span className="font-medium text-slate-900">{t.hero.desc2}</span>
              </p>
              
              <div className="flex flex-col xl:flex-row gap-4 sm:gap-5 justify-center lg:justify-start items-center xl:items-stretch">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <GooglePlayButton />
                  <AppStoreButton />
                  <GalaxyStoreButton />
                </div>
                <Link 
                  to="/demo"
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white border border-transparent px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 active:scale-95 text-sm md:text-base w-full sm:w-auto whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f2]"
                  aria-label={t.hero.demo}
                >
                  {t.hero.demo} <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Visual Mockup */}
          <motion.div 
            style={{ y: phoneY }}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:ml-auto flex justify-center mt-10 lg:mt-0 z-10"
          >
            {/* Abstract Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-60 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)' }}></div>
            
            {/* Phone CSS Mockup with inner float */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[280px] h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-[0_20px_50px_rgba(37,99,235,0.2)] border border-slate-700/50"
            >
              {/* Notch */}
              <div className="absolute top-3 inset-x-0 h-6 bg-slate-900 rounded-b-2xl w-32 mx-auto z-20"></div>
              
              {/* Screen */}
              <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden flex flex-col relative">
                {/* Camera Viewport Placeholder */}
                <div className="h-3/5 bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {/* Scanning Box */}
                  <div className="absolute inset-8 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center">
                     <div className="w-16 h-1 bg-blue-500 rounded-full absolute top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  </div>
                </div>
                
                {/* App UI Below Camera */}
                <div className="flex-1 p-6 flex flex-col justify-end pb-8 bg-white relative rounded-t-3xl -mt-6">
                  <div className="min-h-[140px] flex flex-col justify-end">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={scenarioIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-4 w-full"
                      >
                        <div className="text-center">
                          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">{t.hero.target}</p>
                          <p className="text-xl font-bold text-slate-900">{scenario.target}</p>
                        </div>
                        
                        {/* Result Badge */}
                        <div className={`${scenario.badgeBg} border ${scenario.badgeBorder} ${scenario.badgeText} rounded-2xl p-4 flex items-center justify-center gap-3 shadow-sm`}>
                          <StatusIcon className={scenario.badgeIconText} size={28} />
                          <div>
                            <p className={`text-xs font-semibold uppercase tracking-wider ${scenario.badgeLabelText} mb-1`}>{t.hero.classification}</p>
                            <p className="text-2xl font-bold leading-none">{scenario.status}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
